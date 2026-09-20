import { ArrowUpRight, CircleDot, MessageSquare } from "lucide-react";
import type { ContributeIssue } from "@/lib/contribute";
import {
  ContributeReveal,
  ContributeStaggerGrid,
  ContributeStaggerItem,
} from "./contribute-motion";

const FALLBACK_ISSUES_URL =
  "https://github.com/search?q=org%3AEternalCodeTeam+label%3A%22good+first+issue%22+is%3Aopen&type=issues";

export function ContributeIssues({ issues }: { issues: ContributeIssue[] }) {
  return (
    <section className="contribute-issues section-shell">
      <ContributeReveal className="contribute-issues-heading">
        <div>
          <p className="page-kicker">Start here</p>
          <h2>Good first issues.</h2>
          <p>
            Maintainers tag tasks that are well-scoped and friendly to newcomers. Each one comes
            with context in the discussion and a review from the team when you open a pull request.
          </p>
        </div>
      </ContributeReveal>

      {issues.length > 0 ? (
        <ContributeStaggerGrid className="contribute-issues-list">
          {issues.map((issue) => (
            <ContributeStaggerItem key={issue.id}>
              <a
                className="contribute-issue"
                href={issue.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <CircleDot aria-hidden="true" className="contribute-issue-icon" />
                <span className="contribute-issue-body">
                  <strong>{issue.title}</strong>
                  <span className="contribute-issue-meta">
                    {issue.repo}
                    {issue.comments > 0 && (
                      <>
                        {" · "}
                        <MessageSquare aria-hidden="true" /> {issue.comments}
                      </>
                    )}
                  </span>
                </span>
                <ArrowUpRight aria-hidden="true" className="contribute-issue-arrow" />
              </a>
            </ContributeStaggerItem>
          ))}
        </ContributeStaggerGrid>
      ) : (
        <ContributeReveal className="contribute-issues-empty">
          <p>
            No open issues with this label right now — but there is always something to do. Browse
            the repositories and pick whatever catches your eye.
          </p>
          <a href={FALLBACK_ISSUES_URL} rel="noopener noreferrer" target="_blank">
            Browse issues on GitHub <ArrowUpRight aria-hidden="true" />
          </a>
        </ContributeReveal>
      )}
    </section>
  );
}
