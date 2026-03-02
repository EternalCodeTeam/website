/** A single indexed chunk with its embedding vector */
export interface VectorChunk {
  /** Unique ID: `${docPath}#${anchor}` or `${docPath}#chunk-${n}` */
  id: string;
  /** Doc URL path, e.g. `/docs/eternalcore/commands` */
  docPath: string;
  /** Page title from frontmatter */
  title: string;
  /** Section anchor (slug of the nearest heading), e.g. `how-does-it-work` */
  anchor: string;
  /** Raw text of this chunk */
  text: string;
  /** OpenAI `text-embedding-3-small` vector (1536 dims) */
  embedding: number[];
}

/** Root structure of `content/_generated/vector-index.json` */
export interface VectorIndex {
  version: 1;
  generatedAt: string;
  model: string;
  chunks: VectorChunk[];
}

/** Source reference returned to the frontend */
export interface AiSource {
  title: string;
  /** URL path of the source page */
  path: string;
  /** Anchor within the page (without #) */
  anchor: string;
}

/** Shape of POST /api/ai/query request body */
export interface AiQueryRequest {
  question: string;
}

/** Shape of POST /api/ai/query response */
export interface AiQueryResponse {
  answer: string;
  sources: AiSource[];
}

/** A single chat message in the frontend */
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: AiSource[];
  isStreaming?: boolean;
}
