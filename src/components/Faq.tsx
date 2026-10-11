"use client";

import { css } from "@/styles/classes";
import { useState } from "react";
import { faqs } from "@/data/content";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(5);
  return (
    <div className={css("faq-content")}>
      <h2 id="faq-title">Generic Project Questions</h2>
      <div className={css("faq-list")}>
        {faqs.map((faq, i) => (
          <article
            className={css(`faq-item ${open === i ? "is-open" : ""}`)}
            key={faq.question}
          >
            <h3>
              <button
                id={`faq-question-${i}`}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {faq.question}
                <span className={css("faq-symbol")} aria-hidden="true">
                  {open === i ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              className={css("faq-answer")}
              id={`faq-answer-${i}`}
              role="region"
              aria-labelledby={`faq-question-${i}`}
              inert={open !== i}
              aria-hidden={open !== i}
            >
              <div>
                <p>{faq.answer}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
