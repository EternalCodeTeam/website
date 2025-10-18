"use client"
import { create, insert, search, type AnyOrama } from "@orama/orama"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Tag } from "lucide-react"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

interface Placeholder {
  name: string
  description: string
  example: string
  returnType: string
  category: string
  requiresPlayer: boolean
}

export default function DynamicPlaceholdersTable() {
  const [all, setAll] = useState<Placeholder[]>([])
  const [view, setView] = useState<Placeholder[]>([])
  const [cats, setCats] = useState<string[]>([])
  const [cat, setCat] = useState("All")
  const [query, setQuery] = useState("")
  const [db, setDb] = useState<AnyOrama>()
  const [focus, setFocus] = useState(false)
  const [err, setErr] = useState<string>()

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("https://raw.githubusercontent.com/EternalCodeTeam/EternalCore/refs/heads/automate-placeholder-docs/raw_eternalcore_placeholders.json")
        if (!res.ok) throw new Error("Failed to fetch data")

        const data: Placeholder[] = await res.json()
        const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name, "pl"))
        setAll(sorted)
        setView(sorted)
        setCats(["All", ...new Set(sorted.map(p => p.category))].sort())

        const orama = create({
          schema: {
            name: "string",
            description: "string",
            example: "string",
            returnType: "string",
            category: "string",
            requiresPlayer: "boolean",
          },
        });
        await Promise.all(sorted.map(p => insert(orama, p)))
        setDb(orama)
      } catch (e) {
        setErr(e instanceof Error ? e.message : "Unknown error")
      }
    }
    load()
  }, [])

  const filter = async (q = query, c = cat) => {
    let list = c === "All" ? all : all.filter(p => p.category === c)
    if (q.trim() && db) {
      const hits = await search(db, { term: q, properties: ["name", "description", "example", "category"], tolerance: 1 })
      const ids = new Set(hits.hits.map(h => (h.document as Placeholder).name))
      list = list.filter(p => ids.has(p.name))
    }
    setView(list)
  }

  if (err) return <div className="p-6 text-center text-red-500">Error: {err}</div>
  if (!all.length) return <div className="p-6 text-center text-gray-500 dark:text-gray-400">Loading…</div>

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              value={query}
              onChange={e => (setQuery(e.target.value), filter(e.target.value))}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              placeholder="Search placeholders..."
              className={cn(
                "w-full rounded-lg border px-4 py-2.5 pl-10 text-sm transition-all duration-200",
                focus ? "border-blue-500 shadow-lg ring-2 ring-blue-500/50" : "border-gray-300 shadow-sm dark:border-gray-700",
                "bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              )}
            />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Placeholders: <span className="font-semibold">{view.length}</span> / {all.length}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {cats.map(c => (
            <button
              key={c}
              onClick={() => (setCat(c), filter(query, c))}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                c === cat
                  ? "bg-blue-500 text-white shadow-blue-500/30 shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              )}
            >
              <Tag size={12} />{c}
            </button>
          ))}
        </div>
      </div>

      <div className="my-6 overflow-x-auto rounded-lg">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
          <tr>{["Placeholder", "Description", "Example", "Type", "Category", "Player Context"].map(h => <th key={h} className="px-4 py-2 font-semibold">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          <AnimatePresence>
            {view.map((p, i) => (
              <motion.tr key={p.name} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }} transition={{ duration: 0.15, delay: i * 0.01 }}
                         className="hover:bg-gray-50 dark:hover:bg-gray-900">
                <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">{p.name}</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{p.description}</td>
                <td className="px-4 py-2 font-mono text-green-600 dark:text-green-400">{p.example}</td>
                <td className="px-4 py-2"><span className="rounded bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">{p.returnType}</span></td>
                <td className="px-4 py-2"><span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium dark:bg-gray-800 dark:text-gray-300">{p.category}</span></td>
                <td className="px-4 py-2 text-center"><span className={cn("rounded px-2 py-0.5 text-xs font-medium", p.requiresPlayer ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400")}>{p.requiresPlayer ? "Required" : "Optional"}</span></td>
              </motion.tr>
            ))}
          </AnimatePresence>
          </tbody>
        </table>
      </div>

      {!view.length && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center text-gray-500 dark:text-gray-400">No placeholders found.</motion.div>}
    </div>
  )
}
