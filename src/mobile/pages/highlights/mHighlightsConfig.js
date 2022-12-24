import { lazy } from "react";

export const MHighlightsConfig = {
    routes: [
        {
            path: "/m_highlights",
            component: lazy(() => import("./mHighlights")),
        },
    ],
};
