"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { HiOutlineArrowRight, HiOutlinePhone } from "react-icons/hi2";
import { RiSparklingLine } from "react-icons/ri";

export function PreFooterCTA() {
  return (
    <section className="flow-section prefooter-cta relative mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative overflow-hidden rounded-4xl border border-white/10 bg-[#0D1321] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.24)] sm:p-8 lg:p-12"
        >
          {/* background glow */}
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              animate={{ opacity: [0.7, 1, 0.75] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(240,235,216,0.10),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(116,140,171,0.18),transparent_34%)]"
            />
            <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(240,235,216,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(240,235,216,0.16)_1px,transparent_1px)] bg-size-[36px_36px]" />
          </div>

          {/* subtle inner border */}
          <div className="pointer-events-none absolute inset-0 rounded-4xl shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-12">
            <div className="min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08, duration: 0.45, ease: "easeOut" }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#748CAB] backdrop-blur-md sm:text-xs"
              >
                <RiSparklingLine className="h-4 w-4" />
                Spremni za suradnju
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.14, duration: 0.5, ease: "easeOut" }}
                className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-[#F0EBD8] sm:text-4xl lg:text-5xl"
              >
                Trebate pouzdanog partnera za elektro materijal, web aplikacije
                ili poslovnu analitiku?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                className="mt-5 max-w-2xl text-sm leading-7 text-[#8EA3B8] sm:text-base sm:leading-8"
              >
                Pomažemo kroz distribuciju elektro materijala, razvoj modernih
                digitalnih rješenja i Power BI izvještavanje prilagođeno
                poslovnim procesima i svakodnevnom radu timova.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.26, duration: 0.5, ease: "easeOut" }}
                className="mt-6 flex flex-wrap gap-3"
              >
                <Tag>Elektro materijal</Tag>
                <Tag>Web aplikacije</Tag>
                <Tag>Power BI &amp; Data</Tag>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18, duration: 0.55, ease: "easeOut" }}
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1"
            >
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <Link
                  href="/kontakt"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#F0EBD8]/90 bg-[#F0EBD8] px-5 py-3.5 text-sm font-semibold text-[#0D1321] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-300 hover:bg-white"
                >
                  <span className="text-[#0D1321]">Kontaktirajte nas</span>
                  <HiOutlinePhone className="h-4 w-4 text-[#0D1321] transition duration-300 group-hover:scale-105" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <Link
                  href="https://www.zivic-elektro.shop"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-semibold text-[#F0EBD8] backdrop-blur-md transition-all duration-300 hover:border-[#748CAB]/50 hover:bg-white/9"
                >
                  <span>Pregledajte online shop</span>
                  <HiOutlineArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-xs text-[#748CAB]">
      {children}
    </div>
  );
}
