import React from "react";
import AdminSidebar from "../AdminSidebar";

const SkeletonBlock = ({ className = "" }) => (
  <div className={`animate-pulse rounded-xl bg-slate-200 ${className}`} />
);

const DashboardSkeleton = () => (
  <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden">
    <AdminSidebar />

    <main className="flex-1 flex flex-col overflow-hidden">
      <header className="bg-white border-b border-slate-100 px-4 md:px-8 py-4 md:h-[72px] flex items-center flex-shrink-0">
        <div className="space-y-2">
          <SkeletonBlock className="h-4 w-44" />
          <SkeletonBlock className="h-2.5 w-60" />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-8 space-y-6 md:space-y-8">
        <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <SkeletonBlock className="h-2.5 w-24 mb-3" />
              <SkeletonBlock className="h-8 w-20" />
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-10">
          <section className="xl:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm h-[520px] overflow-hidden">
            <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6 border-b border-slate-50">
              <SkeletonBlock className="h-3 w-36" />
              <SkeletonBlock className="h-8 w-28" />
            </div>
            <div className="p-4 space-y-2">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center justify-between px-6 py-5 border-b border-slate-50">
                  <div className="space-y-2">
                    <SkeletonBlock className="h-3 w-32" />
                    <SkeletonBlock className="h-2.5 w-24" />
                  </div>
                  <div className="space-y-2 flex flex-col items-end">
                    <SkeletonBlock className="h-3 w-24" />
                    <SkeletonBlock className="h-5 w-20 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-3xl border border-slate-100 shadow-sm h-[520px] overflow-hidden">
            <div className="flex items-center gap-3 px-4 md:px-8 py-4 md:py-6 border-b border-slate-50">
              <SkeletonBlock className="w-10 h-10 rounded-2xl" />
              <div className="space-y-2">
                <SkeletonBlock className="h-3 w-24" />
                <SkeletonBlock className="h-2.5 w-32" />
              </div>
            </div>
            <div className="p-6 space-y-5">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <SkeletonBlock className="h-3 w-4/5" />
                    <SkeletonBlock className="h-2.5 w-2/5" />
                  </div>
                  <SkeletonBlock className="h-6 w-12 rounded-lg" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
);

export default DashboardSkeleton;
