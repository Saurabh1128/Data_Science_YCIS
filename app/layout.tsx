import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "YCIS Data Science Program",
  description: "Yashavantrao Chavan Institute of Science Data Science Department",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Run before React hydrates
              const attributesToRemove = ['cz-shortcut-listen', 'data-grammarly'];
              
              function cleanDom() {
                attributesToRemove.forEach(function(attrName) {
                  document.querySelectorAll('[' + attrName + ']').forEach(function(el) {
                    el.removeAttribute(attrName);
                  });
                });
              }
              
              // Clean immediately and after load to handle extensions that add attributes later
              cleanDom();
              window.addEventListener('load', cleanDom);
              
              // Also use MutationObserver to catch attributes added after initial load
              const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                  if (mutation.type === 'attributes' && 
                      attributesToRemove.includes(mutation.attributeName)) {
                    mutation.target.removeAttribute(mutation.attributeName);
                  }
                });
              });
              
              // Start observing once DOM is loaded
              document.addEventListener('DOMContentLoaded', function() {
                observer.observe(document.body, { 
                  attributes: true,
                  subtree: true,
                  attributeFilter: attributesToRemove
                });
              });
            })();
          `
        }} />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-white dark:bg-gray-900`}>
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  )
}



import './globals.css'