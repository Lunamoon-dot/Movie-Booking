import React from 'react';

const ComingSoon = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 px-6 text-white">
      <div className="relative flex flex-col items-center text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs uppercase tracking-[0.4em] text-primary/80">
          Sneak Peek
        </span>
        <h1 className="text-4xl font-semibold uppercase tracking-[0.3em] md:text-6xl bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent">
          Coming Soon
        </h1>
        <p className="mt-6 max-w-xl text-sm text-white/70 md:text-base">
          Chúng mình đang hoàn thiện những hạng mục cuối cùng. Quay lại sau để khám phá trải nghiệm đặt vé mới tinh nhé!
        </p>
        <div className="mt-10 flex items-center gap-3 text-primary/80">
          <span className="block h-px w-16 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <span className="text-xs uppercase tracking-[0.5em]">Stay Tuned</span>
          <span className="block h-px w-16 bg-gradient-to-l from-transparent via-primary/60 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;

