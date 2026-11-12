"use client";

import { pageview } from "@/lib/gtm";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import { Suspense } from "react";

function GtmScriptContent() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && gtmId) {
      pageview(pathname);
    }
  }, [pathname, searchParams, gtmId]);

  if (!gtmId) {
    return null;
  }

  return (
    <>
      <Script
        id="google-ads-conversion"
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-16677728495"
        strategy="beforeInteractive"
      />
      <Script
        id="google-ads-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-16677728495');
  `,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmId}');
  `,
        }}
      />
    </>
  );
}

export default function GtmScript() {
  return (
    <Suspense>
      <GtmScriptContent />
    </Suspense>
  )
}
