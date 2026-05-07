# Copilot Instructions - Demo ReoGrid

## Core Rule: Verify API Before Implementation

Before writing, suggesting, or changing any code, always verify that the target API/function/property exists in the project documentation or type definitions.

Required verification order:

1. Check local package types first: `node_modules/@reogrid/lite/lite.d.ts`.
2. Check project internal ReoGrid types: `src/types/reogrid.type.ts`.
3. Check project docs: `README.md` and local docs/examples.
4. If still unclear, check official package docs for `@reogrid/lite`.

If an API is not found:

1. Do not invent or assume method names.
2. Report clearly that the API is not available.
3. Propose a supported alternative that exists in `lite.d.ts`.
4. Show where the verified API was found (file path + symbol).

## ReoGrid-Specific Guardrails

- Use only methods/types that exist in `@reogrid/lite` definitions.
- Treat Pro-only APIs as unavailable unless the project explicitly uses Pro.
- Respect Lite constraints (max rows/cols and feature limits).

## Response and Change Discipline

For every code change related to ReoGrid:

1. State which API was verified.
2. Reference the source of truth used for verification (including `reogrid.type.ts` when applicable).
3. Apply only verified APIs in implementation.

## Quick Pre-Change Checklist

- Is the exact method name present in `lite.d.ts`?
- Is the related shape/type present in `src/types/reogrid.type.ts`?
- Is the method available in Lite (not Pro-only)?
- Do argument types match the definition?
- Is there an existing project pattern using the same API?

If any answer is no, stop and resolve before coding.
