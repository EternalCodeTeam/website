"use client";

import {
  Background,
  BackgroundVariant,
  type Edge,
  Handle,
  type Node,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Coins, type LucideIcon, MessageSquareText, Server, Swords, Zap } from "lucide-react";
import { FadeIn } from "@/components/ui/motion/motion-components";

// Custom Node for Plugins
const PluginNode = ({
  data,
}: {
  data: { label: string; icon: LucideIcon; color: string; sub: string };
}) => {
  const Icon = data.icon;
  return (
    <div className="group relative">
      <div className="flex flex-col items-center gap-2">
        <div
          className={
            "relative flex h-16 w-16 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 group-hover:border-[#9d6eef]/50 group-hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          }
        >
          <div
            className={`flex h-full w-full items-center justify-center rounded-xl ${data.color}`}
          >
            <Icon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
          </div>
        </div>
        <div className="text-center">
          <div className="font-bold text-gray-900 text-sm tracking-tight transition-colors group-hover:text-[#9d6eef] dark:text-white">
            {data.label}
          </div>
          <div className="font-medium text-[9px] text-gray-400 uppercase tracking-wider">
            {data.sub}
          </div>
        </div>
      </div>
      <Handle className="opacity-0" position={Position.Bottom} type="source" />
    </div>
  );
};

// Custom Node for Server
const ServerNode = ({ data }: { data: { label: string } }) => (
  <div className="relative flex flex-col items-center gap-3">
    <Handle className="opacity-0" position={Position.Top} type="target" />
    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#9d6eef]/20 bg-white p-1.5 shadow-lg dark:bg-gray-950">
      <div className="flex h-full w-full items-center justify-center rounded-full bg-linear-to-b from-[#9d6eef] to-[#854ce6] text-white">
        <Server className="h-10 w-10" />
      </div>
    </div>
    <div className="text-center">
      <div className="font-bold text-gray-900 text-xl tracking-tight dark:text-white">
        {data.label}
      </div>
      <div className="font-semibold text-[10px] text-gray-400 uppercase tracking-widest">
        Standardized Core
      </div>
    </div>
  </div>
);

const nodeTypes = {
  plugin: PluginNode,
  server: ServerNode,
};

const initialNodes: Node[] = [
  {
    id: "chat",
    type: "plugin",
    position: { x: 0, y: 0 },
    data: {
      label: "ChatFormatter",
      icon: MessageSquareText,
      color: "text-blue-500",
      sub: "Communication",
    },
  },
  {
    id: "core",
    type: "plugin",
    position: { x: 280, y: 0 },
    data: { label: "EternalCore", icon: Zap, color: "text-[#9d6eef]", sub: "Essentials" },
  },
  {
    id: "economy",
    type: "plugin",
    position: { x: 560, y: 0 },
    data: { label: "EternalEconomy", icon: Coins, color: "text-emerald-500", sub: "Economy" },
  },
  {
    id: "combat",
    type: "plugin",
    position: { x: 840, y: 0 },
    data: { label: "EternalCombat", icon: Swords, color: "text-red-500", sub: "Mechanics" },
  },
  {
    id: "server",
    type: "server",
    position: { x: 420, y: 400 },
    data: { label: "Your Server" },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1",
    source: "chat",
    target: "server",
    animated: true,
    style: { stroke: "#9d6eef", strokeWidth: 2, opacity: 0.3 },
  },
  {
    id: "e2",
    source: "core",
    target: "server",
    animated: true,
    style: { stroke: "#9d6eef", strokeWidth: 2, opacity: 0.3 },
  },
  {
    id: "e3",
    source: "combat",
    target: "server",
    animated: true,
    style: { stroke: "#9d6eef", strokeWidth: 2, opacity: 0.3 },
  },
  {
    id: "e4",
    source: "economy",
    target: "server",
    animated: true,
    style: { stroke: "#9d6eef", strokeWidth: 2, opacity: 0.3 },
  },
];

export function EternalFoundation() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <section className="relative border-gray-100 border-t py-24 dark:border-gray-800/50">
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <FadeIn>
          <h2 className="mb-4 font-bold text-3xl text-gray-900 tracking-tight md:text-4xl dark:text-white">
            Foundation for Your <span className="text-[#9d6eef]">Success.</span>
          </h2>
          <p className="mx-auto max-w-xl text-base text-gray-500 leading-relaxed dark:text-gray-400">
            The synergy of our solutions creates an ecosystem that grows alongside your server.
          </p>
        </FadeIn>
      </div>

      <div className="relative mx-auto h-[700px] max-w-6xl overflow-hidden">
        <ReactFlow
          edges={edges}
          edgesFocusable={false}
          elementsSelectable={false}
          fitView
          nodes={nodes}
          nodesConnectable={false}
          nodesDraggable={false}
          nodesFocusable={false}
          nodeTypes={nodeTypes}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          panOnDrag={false}
          panOnScroll={false}
          proOptions={{ hideAttribution: true }}
          style={{ background: "transparent" }}
          zoomOnDoubleClick={false}
          zoomOnPinch={false}
          zoomOnScroll={false}
        >
          <Background
            color="#9d6eef"
            gap={25}
            style={{ opacity: 0.03 }}
            variant={BackgroundVariant.Dots}
          />
        </ReactFlow>

        {/* Global styles for React Flow to match our theme */}
        <style global jsx>{`
          .react-flow__edge-path {
            stroke-dasharray: 8;
            animation: dash 5s linear infinite;
            stroke-linecap: round;
          }
          @keyframes dash {
            from { stroke-dashoffset: 48; }
            to { stroke-dashoffset: 0; }
          }
          .react-flow__container {
              pointer-events: none !important;
          }
          .react-flow__node {
              pointer-events: auto !important;
          }
        `}</style>
      </div>
    </section>
  );
}
