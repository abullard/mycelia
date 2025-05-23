'use client';

import Providers from "./providers";
import SplitView from "@/components/home/split-view";

export default function Home() {
  return (
    <Providers>
      <SplitView />
    </Providers>
  );
};
