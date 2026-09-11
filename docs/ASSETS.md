# ASSETS.md — every third-party asset, its source, and its licence

Rule (CLAUDE.md §3, PLAN 3.5): CC0 or equivalent only. No mixed-licence sources. Log before use.

| Asset | Used for | Source | Licence | Size (1k) | Local path |
|---|---|---|---|---|---|
| `moonless_golf` HDRI | Night ambient environment for PBR lighting | https://polyhaven.com/a/moonless_golf | CC0 (Poly Haven) | 1.60 MB | `docs/design/assets/moonless_golf/` |
| `moon_rock_01` | Cave rubble / boulders | https://polyhaven.com/a/moon_rock_01 | CC0 (Poly Haven) | 1.63 MB | `docs/design/assets/moon_rock_01/` |
| `rock_face_01` | Cave wall surfaces | https://polyhaven.com/a/rock_face_01 | CC0 (Poly Haven) | 2.91 MB | `docs/design/assets/rock_face_01/` |
| `vintage_oil_lamp` | The lamp — the scene's light source | https://polyhaven.com/a/vintage_oil_lamp | CC0 (Poly Haven) | 1.97 MB | `docs/design/assets/vintage_oil_lamp/` |
| Bat (animated) | ~~Hero object~~ removed per D11; file kept locally, not published | Quaternius via https://poly.pizza/m/hNO9XvjlKa | CC0 (Public Domain, stated on page) | 228 KB | `docs/design/assets/bat/` |

Status: downloaded 2026-09-11 for the direction-G prototype. **User has not yet approved keeping
them** — decision follows review of the upgraded prototype. Phase 3 re-exports at build-time
resolution (Draco geometry, KTX2 textures) inside the performance budget.

**Artifact note (2026-09-11):** the artifact host serves only standard web media types, so
`docs/design/web/` holds web-servable conversions — each `.bin` embedded as a base64 data URI
inside its `.gltf` JSON, the GLB unpacked the same way, textures copied. The HDRI cannot be
served there and the prototype uses a procedural `RoomEnvironment` fill instead; the HDRI stays
in the repo for the Phase 3 build, which has a real static host.
