# Tanstack Router Sitemap

## Features

- ✅ Generates sitemap.xml from your routes
- ✅ Extends full type safety from TanStack Router with autocomplete
- ✅ Supports dynamic routes

## Installation

```bash
npm install --save-dev tanstack-router-sitemap
```

## Usage

```js
// utils/sitemap.ts
import { type FileRouteTypes } from "@/routeTree.gen";
import { Sitemap } from "tanstack-router-sitemap";

// This will become a string literal union of all your routes
export type TRoutes = FileRouteTypes["fullPaths"];

// Define your sitemap
export const sitemap: Sitemap<TRoutes> = {
  siteUrl: "https://example.com",
  defaultPriority: 0.5,
  routes: {
    "/home": {
      priority: 1,
      changeFrequency: "daily",
    },
    // Dynamic route example
    "/posts/$postId": async (route) => {
      const postsResponse = await fetch("https://example.com/api/posts");
      const posts = await postsResponse.json();

      return posts.map((post) => ({
        path: `/posts/${post.id}`,
        priority: 0.8,
        changeFrequency: "daily",
      }));
    },
  },
};
```

```js
// app.config.ts

import { defineConfig } from "@tanstack/start/config";
import { generateSitemap } from "tanstack-router-sitemap";

// import the sitemap you defined earlier
import { sitemap } from "@/utils/sitemap";

export default defineConfig({
  server: {},
  vite: {
    plugins: [generateSitemap(sitemap)],
  },
});
```

This plugin will generate a `sitemap.xml` file in your public directory.

## Configuration Options

| Name                 | Type                                                                                          | Description                                                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `siteUrl`            | `string`                                                                                      | The base URL of your site                                                                                                   |
| `defaultPriority?`   | `number`                                                                                      | The default priority for all routes                                                                                         |
| `defaultChangeFreq?` | `"always"` \| `"hourly"` \| `"daily"` \| `"weekly"` \| `"monthly"` \| `"yearly"` \| `"never"` | The default change frequency for all routes                                                                                 |
| `routes`             | `{[route: string]: Route \| Route[] \| async (route) => Route[] }`                            | Only static routes can return a `Route`, dynamic routes must return an array of `Route`. See below for full `Route` details |

### Route Configuration

| Name               | Type                                                                                          | Description                                             |
| ------------------ | --------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `path`             | `string`                                                                                      | The path of the route <br/> **Only for dynamic routes** |
| `priority?`        | `number`                                                                                      | The priority of the route                               |
| `changeFrequency?` | `"always"` \| `"hourly"` \| `"daily"` \| `"weekly"` \| `"monthly"` \| `"yearly"` \| `"never"` | The change frequency of the route                       |
| `lastModified?`    | `string` \| `Date`                                                                            | The last modified date of the route                     |

## License

MIT
