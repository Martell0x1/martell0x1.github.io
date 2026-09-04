import { describe, it, expect } from "vitest";
import { mapPull, type RawPull } from "@/data/openSource";

describe("mapPull", () => {
  const base: RawPull = {
    number: 23,
    title: "feat: add list methods",
    state: "closed",
    merged_at: null,
    html_url: "https://github.com/x/y/pull/23",
    user: { login: "Martell0x1" },
    base: { repo: { name: "y", html_url: "https://github.com/x/y", language: "Rust" } },
    labels: [{ name: "enhancement", color: "a2eeef" }],
  };

  it("maps open PRs to open status", () => {
    expect(mapPull({ ...base, state: "open" }).status).toBe("open");
  });

  it("maps merged PRs (closed state + merged_at) to merged status", () => {
    expect(mapPull({ ...base, merged_at: "2026-09-02T15:41:19Z" }).status).toBe("merged");
  });

  it("maps closed PRs without merge to closed status", () => {
    expect(mapPull(base).status).toBe("closed");
  });

  it("preserves title, number, and prUrl", () => {
    const c = mapPull({ ...base, state: "open" });
    expect(c.title).toBe("feat: add list methods");
    expect(c.prNumber).toBe(23);
    expect(c.prUrl).toBe("https://github.com/x/y/pull/23");
  });

  it("maps labels with name and color", () => {
    const c = mapPull({ ...base, state: "open" });
    expect(c.labels).toEqual([{ name: "enhancement", color: "a2eeef" }]);
  });

  it("maps missing labels to an empty array", () => {
    const c = mapPull({ ...base, labels: [] });
    expect(c.labels).toEqual([]);
  });
});