'use client'

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://bkwyqwrkiycfvmfmnksu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrd3lxd3JraXljZnZtZm1ua3N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NjcyNDgsImV4cCI6MjA4OTQ0MzI0OH0.tomDywpNyTPxmO1F1Oc6vDeUrviO94ntBBY26qOlpqo"
);

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    if (!email) {
      setStatus("enter email");
      return;
    }

    const { error } = await supabase
      .from("emails")
      .insert([{ email }]);

    if (error) {
      if (error.message.includes("duplicate")) {
        setStatus("already joined");
      } else {
        setStatus("error, try again");
      }
    } else {
      setStatus("you're in");
      setEmail("");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-[#fafafa] text-black px-6">
      <div className="max-w-sm mx-auto text-center">

        {/* 로고 */}
        <div className="mb-10 text-sm" style={{ fontFamily: 'Schoolbell' }}>
          1life2phase
        </div>

        {/* 타이틀 */}
        <h1 className="mb-8" style={{ fontFamily: 'Schoolbell', fontSize: '30px' }}>
          your workout journal
        </h1>

        {/* 노트 */}
        <div
          className="text-left mx-auto w-fit"
          style={{
            fontFamily: 'Schoolbell',
            fontSize: '18px',
            lineHeight: '1.6',
          }}
        >
          today’s workout…<br />
          bench 185 x 5<br />
          felt stronger than last week
        </div>

        {/* 변화 */}
        <div
          className="mt-6 mb-2"
          style={{ fontFamily: 'Schoolbell', fontSize: '14px' }}
        >
          +10 lbs this week
        </div>

        {/* 그래프 */}
        <div className="flex flex-col items-center mt-16">
          <svg width="220" height="100">
            <path
              d="M10 80 Q 50 60 90 70 T 140 50 T 200 40"
              stroke="black"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              style={{
                strokeDasharray: 300,
                strokeDashoffset: 300,
                animation: 'draw 1.5s ease forwards',
              }}
            />
          </svg>

          <div
            className="flex justify-between w-full mt-4 px-4"
            style={{ fontFamily: 'Schoolbell', fontSize: '12px' }}
          >
            <span>last week</span>
            <span>now</span>
          </div>
        </div>

        {/* 기간 */}
        <div
          className="flex justify-center gap-6 mt-10"
          style={{ fontFamily: 'Schoolbell', fontSize: '14px' }}
        >
          <span className="underline">1W</span>
          <span>1M</span>
          <span>3M</span>
          <span>YTD</span>
          <span>ALL</span>
        </div>

        {/* 구분선 */}
        <div
          className="my-14"
          style={{
            fontFamily: 'Schoolbell',
            fontSize: '12px',
            opacity: 0.4,
          }}
        >
          —
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center">

          <div
            className="mb-4"
            style={{ fontFamily: 'Schoolbell', fontSize: '14px' }}
          >
            track your strength
          </div>

          <input
            type="email"
            placeholder="enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-52 border-b border-black mb-3 text-center outline-none"
            style={{ fontFamily: 'Schoolbell', fontSize: '16px' }}
          />

          <button
            onClick={handleSubmit}
            className="px-5 py-2 border border-black rounded-lg"
            style={{ fontFamily: 'Schoolbell', fontSize: '14px' }}
          >
            get early access
          </button>

          {/* 상태 메시지 */}
          {status && (
            <div className="mt-4 text-sm opacity-70">
              {status}
            </div>
          )}

        </div>

      </div>
    </main>
  );
}