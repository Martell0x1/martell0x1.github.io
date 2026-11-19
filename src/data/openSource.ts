export type ContributionStatus = "merged" | "open" | "closed";

export interface PRLabel {
  name: string;
  color: string;
}

export interface Contribution {
  title: string;
  description?: string;
  prNumber?: number;
  prUrl?: string;
  status?: ContributionStatus;
  labels?: PRLabel[];
  closesIssue?: { number: number; url: string };
}

export interface OpenSourceProject {
  name: string;
  language?: string;
  description?: string;
  repositoryUrl?: string;
  logoUrl?: string;
  stars?: number;
  forks?: number;
  contributions: Contribution[];
  loading?: boolean;
}

export interface TrackedRepo {
  owner?: string;
  repo?: string;
  name?: string;
  language?: string;
  description?: string;
  logoUrl?: string;
  stars?: number;
  forks?: number;
  // When set, these contributions are used directly instead of fetching from
  // the GitHub API (useful for contributions that arrived via mailing list /
  // patch series rather than a GitHub PR).
  contributions?: Contribution[];
}

export const GITHUB_USERNAME = "Martell0x1";

export const trackedRepos: TrackedRepo[] = [
  {
   "name": "Linux Kernel",
   "language": "Rust",
   "description": "The Linux kernel source tree. Contribution to the Rust-for-Linux subsystem.",
   "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg",
   "stars": 160000,
   "forks": 60000,
   "contributions": [
    {
     "title": "rust: kernel: fix lifetime of copy_from_iter_raw",
     "status": "merged",
     "prUrl": "https://kernelthread.org/t/20261114024515.1000882-1-marawanzein222@gmail.com",
     "closesIssue": {
      "number": 1265,
      "url": "https://github.com/Rust-for-Linux/linux/issues/1265"
    },
     "labels": [
      {
       "name": "rust-for-linux",
       "color": "2ea44f"
     },
      {
       "name": "lifetime",
       "color": "fbca04"
     }
    ]
   }
  ]
 },
  {
   "owner": "muhammadyusufpov",
   "repo": "hyper",
   "name": "Hyper",
   "language": "Rust",
   "description": "A Rust-based programming language with an interpreter and a compile/JIT path.",
   "logoUrl": "https://github.com/github.png",
   "stars": 8,
   "forks": 5,
   "contributions": [
    {
     "title": "Fix/f string compiler leak issue",
     "status": "merged",
     "prNumber": 53,
     "prUrl": "https://github.com/hyperlangg/hyper/pull/53",
     "description": "## Overview\n\nThis PR fixes the compile-path string concatenation leak described in #46.\n\nThe issue occurs because `hyper_rt_str_concat` creates a new heap allocation for every concatenation, but intermediate strings that become dead are not released.\n\nFor example:\n\n```hyper\nlet mut s = \"\"\n\nfor i in range(100000):\n    s = s + \"x\"\n```\n\nEach iteration creates a new string while the previous value of `s` becomes unreachable. F-string concatenation can have the same problem with intermediate `StrConcat` results.\n\n## Approach\n\nThe fix introduces explicit ownership tracking for heap-created strings in both the JIT and AOT runtimes.\n\nThe ownership model is:\n\n* Interned `ConstStr` values live in `.rodata` and are never freed.\n* Heap-created Hyper strings are registered as owned strings.\n* `hyper_rt_str_concat` now receives `consume_left` and `consume_right` flags.\n* Codegen determines when a concat operand is an owned value whose last use is the current concat.\n* The runtime releases an operand only when the corresponding consume flag is set **and** the pointer is registered as an owned heap string.\n\nThis avoids the unsafe approach of simply calling `free(left)` inside every concatenation.\n\n## Examples\n\nFor:\n\n```hyper\nt = a + b\n```\n\nthe operands remain live:\n\n```text\nconcat(a, b, 0, 0)\n```\n\nFor:\n\n```hyper\ns = s + \"x\"\n```\n\nthe previous value of `s` can be consumed:\n\n```text\nconcat(old_s, \"x\", 1, 0)\n```\n\nFor an f-string such as:\n\n```hyper\nf\"{a}{b}{c}\"\n```\n\nan intermediate result can be released once its last use is the next concatenation.\n\n## Runtime coverage\n\nThe ownership tracking is applied to heap strings produced by:\n\n* string concatenation\n* `ValueToStr`\n* string methods\n* input\n* JSON serialization\n* file reads\n* mmap reads\n* other runtime paths that return heap-allocated strings\n\nBoth JIT and AOT runtimes use the same four-argument concat ABI and ownership semantics.\n\n## Tests\n\nAdded coverage for:\n\n* concatenation without consumption preserving live operands\n* consuming an owned temporary\n* ensuring interned literals are never freed\n* repeated store-back concatenation without accumulating owned strings\n\nThe language syntax, parser, AST, IR, and lowering remain unchanged."
   },
    {
     "title": "perf: hashed dict get/set on the compile path (#44)",
     "status": "merged",
     "prNumber": 47,
     "prUrl": "https://github.com/hyperlangg/hyper/pull/47",
     "description": "## Summary\n- Replace linear-scan `hyper_rt_dict_get` / `set` with a hash map behind the existing ABI (no Hyper syntax changes).\n- JIT uses `indexmap::IndexMap`; AOT (`hyper_rt.c`) keeps insertion-order entries plus an open-addressing slot table. Print, `keys()`, and JSON dump still walk insertion order; duplicate keys overwrite and keep the first key's position.\n- Add `dict_get_set_on_medium_map` (~256 keys, ~1e6 gets, wall-time bound) and `ci/dict_compile.hyp` on JIT and `--emit-exe`.\n\n## Test plan\n- [x] `cargo test` (includes `dict_get_set_on_medium_map` and existing dict equality / `keys()` tests)\n- [x] `hyper compile ci/dict_compile.hyp` and `--emit-exe` (same output)\n- [x] `ci/collections_compile.hyp`, `ci/json_compile.hyp`, `ci/smoke.hyp` (dict print order `{b: 1, a: 2}`)"
   },
    {
     "title": "feat: improved error message for module imports",
     "status": "closed",
     "prNumber": 41,
     "prUrl": "https://github.com/hyperlangg/hyper/pull/41"
   },
    {
     "title": "feat: hyper cli --version flag",
     "status": "closed",
     "prNumber": 35,
     "prUrl": "https://github.com/hyperlangg/hyper/pull/35",
     "description": "## Description\n- Added A new flag to the cli main.rs file\n\n## Test \n- `cargo run -- --version` equal to `hyper --version`"
   },
    {
     "title": "docs: added contributing.md in the project root directory",
     "status": "closed",
     "prNumber": 34,
     "prUrl": "https://github.com/hyperlangg/hyper/pull/34",
     "description": "## Description\n- Added detailed documentation in the root of project's directory CONTRIBUTING.md"
   },
    {
     "title": "Feat/while for loop else addition interpreter path",
     "status": "closed",
     "prNumber": 33,
     "prUrl": "https://github.com/hyperlangg/hyper/pull/33",
     "description": "## Description\n\n- added the optional else in the ast in both while and for statments\n- added break boolean flag that detects the break statement if reached we will ignore the optional else for both for and while statements\n- edected the execute for for and break catch that support the new changes in interpreter\n- added examples to manualy test `doc/examples/loop/for_break.hyp`, `doc/examples/loop/while_break.hyp`\n- added smoke tests for the ci pipeline\n\n## Test Plan\n\n- [ ] `cargo run -- compile doc/examples/loop/for_break.hyp` matches `run`\n- [ ] `cargo run --compile doc/examples/loop/while_break.hyp` matches `run`\n- [ ] `cargo run -- compile ci/for_while_else.hyp` matches `run`\n- [ ] `cargo run -- compile ci/for_while_else.hyp --emit-exe /tmp/hyper_coll` and `/tmp/hyper_coll` match `run`"
   },
    {
     "title": "Docs",
     "status": "closed",
     "prNumber": 32,
     "prUrl": "https://github.com/hyperlangg/hyper/pull/32",
     "description": "## Description\n- Added Detailed document and reference for other parts for the topics stated in the issue"
   },
    {
     "title": "feat: else support for while and for loops:",
     "status": "closed",
     "prNumber": 31,
     "prUrl": "https://github.com/hyperlangg/hyper/pull/31",
     "description": "## Description\n\n- added the optional else in the ast in both while and for statments\n- added break boolean flag that detects the break statement if reached we will ignore the optional else for both for and while statements\n- edected the execute for for and break catch that support the new changes in interpreter\n- added examples to manualy test `doc/examples/loop/for_break.hyp`, `doc/examples/loop/while_break.hyp`\n- added smoke tests for the ci pipeline\n\n## Test Plan\n\n- [ ] `cargo run -- compile doc/examples/loop/for_break.hyp` matches `run`\n- [ ] `cargo run --compile doc/examples/loop/while_break.hyp` matches `run`\n- [ ] `cargo run -- compile ci/for_while_else.hyp` matches `run`\n- [ ] `cargo run -- compile ci/for_while_else.hyp --emit-exe /tmp/hyper_coll` and `/tmp/hyper_coll` match `run`"
   },
    {
     "title": "feat: lower list, array, and dict methods on the compile path",
     "status": "merged",
     "prNumber": 24,
     "prUrl": "https://github.com/hyperlangg/hyper/pull/24",
     "description": "## Summary\n- Lower `len()`, `append(x)` on lists/arrays and `len()`, `keys()` on dicts through `hyper_rt_coll_*` so JIT and `--emit-exe` match `run`\n- Check arity at lower time; wrong receiver still fails at runtime with the same messages as the interpreter (`this type has no method 'len'`, `list has no method 'keys'`, \u2026)\n- Add `ci/collections_compile.hyp`, wire it into CI, and drop the compiler gap from known limitations\n\n## Test plan\n- [ ] `cargo run -- compile doc/examples/collection/methods.hyp` matches `run`\n- [ ] `cargo run -- compile ci/collections_compile.hyp` matches `run`\n- [ ] `cargo run -- compile ci/collections_compile.hyp --emit-exe /tmp/hyper_coll` and `/tmp/hyper_coll` match `run`\n- [ ] `items.append()` is `SyntaxError: \u2026 append expects 1 argument(s) but got 0`\n- [ ] `n.len()` on an integer is `RuntimeError: \u2026 this type has no method 'len'`\n- [ ] `\"hi\".len()` still prints `2`\n- [ ] `cargo test` \u2014 `collection_methods_lower_to_runtime_calls`, `collection_method_arity_is_checked`, `coll_len_append_keys`"
   },
    {
     "title": "feat: add list, array, and dict methods on the interpreter path",
     "status": "merged",
     "prNumber": 23,
     "prUrl": "https://github.com/hyperlangg/hyper/pull/23",
     "description": "## Summary\n- Add interpreter methods for lists/arrays (`len()`, `append(x)`) and dicts (`len()`, `keys()`), with arity and unknown-method runtime errors\n- Mutate the stored collection on `append` via `with_value_mut`, so the variable updates instead of a cloned copy\n- Add a runnable example at `doc/examples/collection/methods.hyp` and note that these methods are interpreter-only in `doc/compiler/known-limitations.md`\n\n## Test plan\n- [ ] `cargo run -- run doc/examples/collection/methods.hyp` prints lengths, the appended list/array, and insertion-ordered dict keys\n- [ ] `\"hi\".len()` still works (string methods unchanged)\n- [ ] `items.append()` reports `append expects 1 argument(s) but got 0`\n- [ ] `items.keys()` reports `list has no method 'keys'`\n- [ ] `scores.append(1)` reports `dict has no method 'append'`\n- [ ] `n.len()` on an integer reports `this type has no method 'len'`\n- [ ] `compile` is unchanged: these methods are not lowered"
   }
  ]
 },
  {
   "owner": "tokio-rs",
   "repo": "topcoat",
   "name": "Topcoat",
   "language": "Rust",
   "description": "A batteries-included framework for building full-stack web apps.",
   "logoUrl": "https://i.ytimg.com/vi/VCgUmW6WzsI/maxresdefault.jpg",
   "stars": 7272,
   "forks": 314,
   "contributions": [
    {
     "title": "fix(router): strip prefix layer",
     "status": "merged",
     "prNumber": 397,
     "prUrl": "https://github.com/tokio-rs/topcoat/pull/397"
   }
  ]
 },
  {
   "owner": "gabime",
   "repo": "spdlog",
   "name": "spdlog",
   "language": "C++",
   "description": "A very fast, header-only C++ logging library.",
   "logoUrl": "https://i-blog.csdnimg.cn/direct/34bab29729e44e8ebf8be8a48fb9ed91.png",
   "stars": 29778,
   "forks": 5337,
   "contributions": [
    {
     "title": "Add SPDLOG_LOGGER_CONDITIONAL, SPDLOG_LOGGER_EVERY_N and SPDLOG_LOGGER_THROTTLE macros",
     "status": "open",
     "prNumber": 3695,
     "prUrl": "https://github.com/gabime/spdlog/pull/3695",
     "description": "# Summary\nAdded three conditional log macros in a dedicated header file `conditional_log.h` , as suggested in issue discussion , They are not included from `spdlog.h`, so existing users are unaffected.\n\n| Macro | Behavior |\n|---|---|\n| `SPDLOG_LOGGER_CONDITIONAL(logger, cond, level, fmt, ...)` | Logs only if `cond` is true. |\n| `SPDLOG_LOGGER_EVERY_N(logger, level, N, fmt, ...)` | Logs on the 1st call and then every N-th call (calls 0, N, 2N, ...). |\n| `SPDLOG_LOGGER_THROTTLE(logger, level, interval_sec, fmt, ...)` | Logs at most once per `interval_sec` seconds (`double`). |\n\n```cpp\nSPDLOG_LOGGER_CONDITIONAL(lg, error_count > 0, spdlog::level::err, \"Found {} errors\", error_count);\n\nfor (int i = 0; i < 100; ++i) {\n    SPDLOG_LOGGER_EVERY_N(lg, spdlog::level::info, 10, \"Progress: {}\", i);      // i = 0, 10, 20, ...\n    SPDLOG_LOGGER_THROTTLE(lg, spdlog::level::warn, 1.0, \"High frequency event: {}\", i);\n}\n```\n- All three are built on `SPDLOG_LOGGER_CALL`, so `__FILE__`, `__LINE__` and the function name point at the user's call site, and `SPDLOG_NO_SOURCE_LOC` is respected.\n- Each macro expands to `do { ... } while (0)`, so it is a single statement and is safe in an unbraced `if`/`else`.\n- Format arguments are only evaluated when a message is actually logged. A skipped call has no formatting cost and no argument side effects.\n- `EVERY_N` and `THROTTLE` keep state in a `static std::atomic` inside the macro block, so each thread gets a unique count and the result is exact under concurrency.\n - `EVERY_N` uses `fetch_add(relaxed)`, so each thread gets a unique count and the result is exact under concurrency.\n- `THROTTLE` uses `std::chrono::steady_clock` (not affected by wall-clock changes), stores nanoseconds in an `atomic<long long>`, uses `compare_exchange_strong` so exactly one thread wins each interval. A sentinel value guarantees that the first call always logs.\n- `N` and `interval_sec` are evaluated once.\n- Header-only, with no new `.cpp` file, with no new `.cpp` file, with no CMake source changes, and C++11-compatible.\n\n### Tests\nNew file `tests/test_conditional_log.cpp`, registered in `tests/CMakeLists.txt`:\n\n- CONDITIONAL: true logs, false doesn't, arguments are not evaluated when false, no dangling-`else` problem\n- EVERY_N: 100 iterations with N=10 gives 10 lines starting at `i = 0`\n- THROTTLE: only the first call logs under a long interval; logs again after the interval passes; 8 threads x 1000 calls with a long interval logs exactly once; `interval <= 0` logs every call\n\n- [ ] Tests pass with `-DSPDLOG_BUILD_TESTS=ON`\n- [ ] Tests pass with `-DSPDLOG_BUILD_TESTS_HO=ON`\n\n## Notes\nWhile building the test suite on my machine, `tests/test_systemd_namespace.cpp` fails to compile because `systemd_namespace_sink.h` uses `string_view_t::find`, `substr` and `npos`, which the bundled fmt's `basic_string_view` doesn't provide. This is unrelated to this PR and I left it untouched.\n\nthis could be another issue , if you want i can open a new one for it.\n\n\n```cmake\nif(systemd_FOUND)\n    list(APPEND SPDLOG_UTESTS_SOURCES test_systemd.cpp)\n    # systemd v256 added support for namespace stream API\n    if(systemd_VERSION VERSION_GREATER_EQUAL \"256\")\n    list(APPEND SPDLOG_UTESTS_SOURCES test_systemd_namespace.cpp)\n    endif()\nendif()\n```\n\nthis could be another issue , if you want i can open a new one for it.",
     "closesIssue": {
      "number": 3652,
      "url": "https://github.com/gabime/spdlog/issues/3652"
    }
   },
    {
     "title": "Fix MSVC compile option propagation for CUDA",
     "status": "merged",
     "prNumber": 3694,
     "prUrl": "https://github.com/gabime/spdlog/pull/3694",
     "description": "## Summary\n\nFix propagation of `/Zc:__cplusplus` from `spdlog::spdlog_header_only` to CUDA compilation when using MSVC as the host compiler.\n\n## Problem\n\nThe header-only target currently propagates `/Zc:__cplusplus` unconditionally within the MSVC configuration. When a consumer target includes CUDA source files, this option can reach `nvcc` without being forwarded to the host compiler, resulting in a malformed compilation command.\n\n## Changes\n\n- Restrict `/Zc:__cplusplus` to C++ compilation.\n- Forward the option to the MSVC host compiler for CUDA compilation using `-Xcompiler`.\n\n## Validation\n\n- [x] Linux build succeeds.\n- [x] Existing tests pass.\n- [ ] Windows/MSVC + CUDA compilation is verified, or the lack of access to this environment is documented.\n\nFixes #3425.",
     "closesIssue": {
      "number": 3425,
      "url": "https://github.com/gabime/spdlog/issues/3425"
    }
   }
  ]
 },
  {
   "owner": "uutils",
   "repo": "coreutils",
   "name": "coreutils",
   "language": "Rust",
   "description": "Cross-platform Rust rewrite of the GNU coreutils.",
   "logoUrl": "https://blog.desdelinux.net/wp-content/uploads/2022/05/GNU-Coreutils.png",
   "stars": 24394,
   "forks": 2198,
   "contributions": [
    {
     "title": "pr: fix expected output in non-UTF-8 merge test",
     "status": "merged",
     "prNumber": 16161,
     "prUrl": "https://github.com/uutils/coreutils/pull/16161",
     "description": "## Summary\n\nFix the expected output of `test_merge_non_utf8_input_filename` and re-enable the regression test.\n\n## Problem\n\nThe test expected the final column to be padded to 35 characters. However, `pr` intentionally does not pad the last cell of a merged row.\n\nThis behavior is documented in `get_line_for_printing()`:\n\n```rust\n// Like GNU pr, the last cell of a row is not padded, so the\n// line has no trailing spaces.\n```\n\n## Changes\n\n- Correct the expected output to avoid padding the final column.\n\n## Testing\n\n```bash\ncargo nextest run -E 'test(test_merge_non_utf8_input_filename)'\n```\n\nThe test passes with the corrected expectation.\n\nCloses #16147 ",
     "closesIssue": {
      "number": 16147,
      "url": "https://github.com/uutils/coreutils/issues/16147"
    }
   },
    {
     "title": "fix(realpath): reject non-directory path components and forcing them to ENOTDIR",
     "status": "open",
     "prNumber": 16153,
     "prUrl": "https://github.com/uutils/coreutils/pull/16153",
     "description": "## Problem\n\nuutils `realpath` incorrectly accepts paths containing a regular file followed by `..`.\n\nFor example, `/tmp/example/file/..` succeeds in uutils, whereas GNU `realpath` fails with `ENOTDIR` (Not a directory).\n\nThe implementation removes the preceding component when encountering `ParentDir` without verifying that the component is a directory.\n\n## Root Cause\n\nIn `src/uucore/src/lib/features/fs.rs`, the `ParentDir` branch performs:\n\n```rust\nOwningComponent::ParentDir => {\n    result.pop();\n}\n```\n\nThis removes the preceding component without validating whether it can be traversed as a directory.\n\n## Fix\n\nValidate path components before resolving `ParentDir`, rejecting non-directory and nonexistent intermediate components where required by the selected resolution mode.\n\n## Tests\n\n- Added regression tests covering invalid file/parent-directory traversal and valid directory/parent-directory traversal.\n- Tested against the realpath feature:\n\n```bash\ncargo test --no-default-features --features realpath\n```\n\n- Manually verified behavior using regular files, directories, and symlinks.\n\nRequires #16161 \r\nCloses #16117 ",
     "closesIssue": {
      "number": 16117,
      "url": "https://github.com/uutils/coreutils/issues/16117"
    }
   },
    {
     "title": "CONTRIBUTING: recommend #[rstest] for parameterized tests",
     "status": "merged",
     "prNumber": 16050,
     "prUrl": "https://github.com/uutils/coreutils/pull/16050",
     "description": "Closes #16046 ",
     "closesIssue": {
      "number": 16046,
      "url": "https://github.com/uutils/coreutils/issues/16046"
    }
   }
  ]
 }
];

export const repoUrl = (owner: string, repo: string) =>
  `https://github.com/${owner}/${repo}`;

export const HYPER_REPO = "https://github.com/muhammadyusufpov/hyper";

export interface HeatmapDay {
  date: string;
  count: number;
  level: number;
}

export const heatmapDays: HeatmapDay[] = [
  {
   "date": "2025-11-16",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-11-17",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-11-18",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-11-19",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-11-20",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-11-21",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-11-22",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-11-23",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-11-24",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-11-25",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-11-26",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-11-27",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-11-28",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-11-29",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-11-30",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-01",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-02",
   "count": 3,
   "level": 1
 },
  {
   "date": "2025-12-03",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-04",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-05",
   "count": 2,
   "level": 1
 },
  {
   "date": "2025-12-06",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-07",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-08",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-09",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-10",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-11",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-12",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-13",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-14",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-15",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-16",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-17",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-18",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-19",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-20",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-21",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-22",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-23",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-24",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-25",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-26",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-27",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-28",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-29",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-30",
   "count": 0,
   "level": 0
 },
  {
   "date": "2025-12-31",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-01",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-02",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-03",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-04",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-05",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-06",
   "count": 3,
   "level": 1
 },
  {
   "date": "2026-01-07",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-08",
   "count": 5,
   "level": 1
 },
  {
   "date": "2026-01-09",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-10",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-11",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-12",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-13",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-14",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-15",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-16",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-17",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-18",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-19",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-20",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-21",
   "count": 6,
   "level": 1
 },
  {
   "date": "2026-01-22",
   "count": 8,
   "level": 1
 },
  {
   "date": "2026-01-23",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-24",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-25",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-26",
   "count": 4,
   "level": 1
 },
  {
   "date": "2026-01-27",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-28",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-29",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-30",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-01-31",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-02-01",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-02-02",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-02-03",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-02-04",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-02-05",
   "count": 12,
   "level": 2
 },
  {
   "date": "2026-02-06",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-02-07",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-02-08",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-02-09",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-02-10",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-02-11",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-02-12",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-02-13",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-02-14",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-02-15",
   "count": 2,
   "level": 1
 },
  {
   "date": "2026-02-16",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-02-17",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-02-18",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-02-19",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-02-20",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-02-21",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-02-22",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-02-23",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-02-24",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-02-25",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-02-26",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-02-27",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-02-28",
   "count": 3,
   "level": 1
 },
  {
   "date": "2026-03-01",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-02",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-03",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-04",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-05",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-06",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-07",
   "count": 2,
   "level": 1
 },
  {
   "date": "2026-03-08",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-09",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-10",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-11",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-12",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-13",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-14",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-15",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-16",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-17",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-18",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-19",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-20",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-21",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-03-22",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-23",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-03-24",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-25",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-26",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-27",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-28",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-29",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-30",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-03-31",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-04-01",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-04-02",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-04-03",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-04-04",
   "count": 2,
   "level": 1
 },
  {
   "date": "2026-04-05",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-04-06",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-04-07",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-04-08",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-04-09",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-04-10",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-04-11",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-04-12",
   "count": 15,
   "level": 2
 },
  {
   "date": "2026-04-13",
   "count": 12,
   "level": 2
 },
  {
   "date": "2026-04-14",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-04-15",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-04-16",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-04-17",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-04-18",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-04-19",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-04-20",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-04-21",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-04-22",
   "count": 8,
   "level": 1
 },
  {
   "date": "2026-04-23",
   "count": 9,
   "level": 2
 },
  {
   "date": "2026-04-24",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-04-25",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-04-26",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-04-27",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-04-28",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-04-29",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-04-30",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-01",
   "count": 2,
   "level": 1
 },
  {
   "date": "2026-05-02",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-03",
   "count": 2,
   "level": 1
 },
  {
   "date": "2026-05-04",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-05",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-06",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-07",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-08",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-05-09",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-10",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-11",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-12",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-13",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-14",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-15",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-16",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-17",
   "count": 2,
   "level": 1
 },
  {
   "date": "2026-05-18",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-19",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-20",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-21",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-22",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-23",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-24",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-25",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-26",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-27",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-28",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-29",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-30",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-05-31",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-01",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-02",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-03",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-04",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-05",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-06",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-07",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-06-08",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-09",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-10",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-11",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-12",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-13",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-14",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-15",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-16",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-17",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-18",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-19",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-20",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-21",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-22",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-23",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-24",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-25",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-26",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-27",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-28",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-29",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-06-30",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-07-01",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-07-02",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-07-03",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-07-04",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-07-05",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-07-06",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-07-07",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-07-08",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-07-09",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-07-10",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-07-11",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-07-12",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-07-13",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-07-14",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-07-15",
   "count": 2,
   "level": 1
 },
  {
   "date": "2026-07-16",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-07-17",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-07-18",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-07-19",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-07-20",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-07-21",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-07-22",
   "count": 9,
   "level": 2
 },
  {
   "date": "2026-07-23",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-07-24",
   "count": 2,
   "level": 1
 },
  {
   "date": "2026-07-25",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-07-26",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-07-27",
   "count": 13,
   "level": 2
 },
  {
   "date": "2026-07-28",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-07-29",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-07-30",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-07-31",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-08-01",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-08-02",
   "count": 4,
   "level": 1
 },
  {
   "date": "2026-08-03",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-08-04",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-08-05",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-08-06",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-08-07",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-08-08",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-08-09",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-08-10",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-08-11",
   "count": 3,
   "level": 1
 },
  {
   "date": "2026-08-12",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-08-13",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-08-14",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-08-15",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-08-16",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-08-17",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-08-18",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-08-19",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-08-20",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-08-21",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-08-22",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-08-23",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-08-24",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-08-25",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-08-26",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-08-27",
   "count": 2,
   "level": 1
 },
  {
   "date": "2026-08-28",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-08-29",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-08-30",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-08-31",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-09-01",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-09-02",
   "count": 7,
   "level": 1
 },
  {
   "date": "2026-09-03",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-09-04",
   "count": 34,
   "level": 4
 },
  {
   "date": "2026-09-05",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-09-06",
   "count": 10,
   "level": 2
 },
  {
   "date": "2026-09-07",
   "count": 15,
   "level": 2
 },
  {
   "date": "2026-09-08",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-09-09",
   "count": 2,
   "level": 1
 },
  {
   "date": "2026-09-10",
   "count": 9,
   "level": 2
 },
  {
   "date": "2026-09-11",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-09-12",
   "count": 6,
   "level": 1
 },
  {
   "date": "2026-09-13",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-09-14",
   "count": 2,
   "level": 1
 },
  {
   "date": "2026-09-15",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-09-16",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-09-17",
   "count": 10,
   "level": 2
 },
  {
   "date": "2026-09-18",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-09-19",
   "count": 5,
   "level": 1
 },
  {
   "date": "2026-09-20",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-09-21",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-09-22",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-09-23",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-09-24",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-09-25",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-09-26",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-09-27",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-09-28",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-09-29",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-09-30",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-01",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-02",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-03",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-04",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-05",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-06",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-07",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-08",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-09",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-10-10",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-11",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-12",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-13",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-14",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-15",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-16",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-17",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-18",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-19",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-20",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-21",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-22",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-23",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-24",
   "count": 8,
   "level": 1
 },
  {
   "date": "2026-10-25",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-10-26",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-27",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-28",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-10-29",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-10-30",
   "count": 4,
   "level": 1
 },
  {
   "date": "2026-10-31",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-11-01",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-11-02",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-11-03",
   "count": 5,
   "level": 1
 },
  {
   "date": "2026-11-04",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-11-05",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-11-06",
   "count": 7,
   "level": 1
 },
  {
   "date": "2026-11-07",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-11-08",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-11-09",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-11-10",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-11-11",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-11-12",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-11-13",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-11-14",
   "count": 1,
   "level": 1
 },
  {
   "date": "2026-11-15",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-11-16",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-11-17",
   "count": 6,
   "level": 1
 },
  {
   "date": "2026-11-18",
   "count": 0,
   "level": 0
 },
  {
   "date": "2026-11-19",
   "count": 0,
   "level": 0
 }
];

export const heatmapTotal = 296

export interface RawPull {
  number: number;
  title: string;
  body: string | null;
  state: "open" | "closed";
  merged_at: string | null;
  html_url: string;
  user: { login: string };
  base: { repo: { name: string; html_url: string; language: string | null } };
  labels: PRLabel[];
}

const issueReferenceRegex = /(?:close|closes|closed|fix|fixes|fixed|resolve|resolves|resolved)\s+#(\d+)/gi;

export const mapPull = (p: RawPull): Contribution => {
  const closesIssue = (() => {
    if (!p.body) return undefined;
    const match = issueReferenceRegex.exec(p.body);
    if (!match) return undefined;
    const number = parseInt(match[1], 10);
    return { number, url: `${p.base.repo.html_url}/issues/${number}` };
  })();

  return {
    title: p.title,
    prNumber: p.number,
    prUrl: p.html_url,
    status: p.state === "open" ? "open" : p.merged_at ? "merged" : "closed",
    labels: p.labels ?? [],
    ...(closesIssue ? { closesIssue } : {}),
  };
};
