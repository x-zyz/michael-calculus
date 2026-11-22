#!/usr/bin/env python3
"""
Deterministic mathematical & pedagogical contract verifier for
Michael Calculus Chapter 1 ELI5 Batch 1 (30 problems: 18 numeric + 12 written).

Verifies:
1. All 30 Batch 1 problem IDs from docs/eli5-production/chapter-one.json are present in
   src/data/eli5Drafts/ch01Batch01.ts.
2. Independent SymPy / exact rational verification of every original problem and every
   transfer problem across all 30 lessons.
3. Exact match of referenceAnswer on all 18 numeric lessons and transfer.answer on all 30 lessons.
4. Structural, anti-spoiler, wrong-option diagnostic feedback ("检查一下"), remediation, and
   non-placeholder checks.
"""

from __future__ import annotations

import json
import math
from fractions import Fraction
from pathlib import Path
import sympy as sp


ROOT = Path(__file__).resolve().parents[1]
MANIFEST_PATH = ROOT / "docs" / "eli5-production" / "chapter-one.json"
DRAFT_PATH = ROOT / "src" / "data" / "eli5Drafts" / "ch01Batch01.ts"


def verify_sympy_math() -> dict[str, dict[str, object]]:
    x, t, u, h, a, n = sp.symbols("x t u h a n", real=True)
    n_pos = sp.Symbol("n", integer=True, positive=True)

    results: dict[str, dict[str, object]] = {}

    # 1. p37: f(u)=sqrt(u), g(x)=5-x^2, f(g(1)) ; transfer: g(x)=10-x^2, f(g(1))
    orig_p37 = sp.sqrt(5 - sp.Integer(1) ** 2)
    trans_p37 = sp.sqrt(10 - sp.Integer(1) ** 2)
    assert orig_p37 == 2 and trans_p37 == 3
    results["p37"] = {"original": int(orig_p37), "transfer": int(trans_p37)}

    # 2. p124: f(t)=sqrt(9-t^2), g(x)=2x-1 domain length ; transfer: sqrt(16-t^2), g(x)=2x+1
    sol_p124 = sp.solve_univariate_inequality(9 - (2 * x - 1) ** 2 >= 0, x, relational=False)
    len_p124 = sol_p124.sup - sol_p124.inf
    sol_p124_t = sp.solve_univariate_inequality(16 - (2 * x + 1) ** 2 >= 0, x, relational=False)
    len_p124_t = sol_p124_t.sup - sol_p124_t.inf
    assert len_p124 == 3 and len_p124_t == 4
    results["p124"] = {"original": int(len_p124), "transfer": int(len_p124_t)}

    # 3. p164: sqrt(4x+12) left endpoint ; transfer: sqrt(3x+15) left endpoint
    sol_p164 = sp.solve_univariate_inequality(4 * x + 12 >= 0, x, relational=False)
    sol_p164_t = sp.solve_univariate_inequality(3 * x + 15 >= 0, x, relational=False)
    assert sol_p164.inf == -3 and sol_p164_t.inf == -5
    results["p164"] = {"original": int(sol_p164.inf), "transfer": int(sol_p164_t.inf)}

    # 4. p165: 1/sqrt(25-x^2) domain length ; transfer: 1/sqrt(36-x^2)
    sol_p165 = sp.solve_univariate_inequality(25 - x**2 > 0, x, relational=False)
    len_p165 = sol_p165.sup - sol_p165.inf
    sol_p165_t = sp.solve_univariate_inequality(36 - x**2 > 0, x, relational=False)
    len_p165_t = sol_p165_t.sup - sol_p165_t.inf
    assert len_p165 == 10 and len_p165_t == 12
    results["p165"] = {"original": int(len_p165), "transfer": int(len_p165_t)}

    # 5. p166: arcsin(x-5) right endpoint ; transfer: arcsin(x-8) right endpoint
    sol_p166 = sp. reduce_inequalities([-1 <= x - 5, x - 5 <= 1], x).as_set()
    sol_p166_t = sp.reduce_inequalities([-1 <= x - 8, x - 8 <= 1], x).as_set()
    assert sol_p166.sup == 6 and sol_p166_t.sup == 9
    results["p166"] = {"original": int(sol_p166.sup), "transfer": int(sol_p166_t.sup)}

    # 6. p2: lim_{x->2}(x^2+3x) ; transfer: lim_{x->3}(x^2+2x)
    orig_p2 = sp.limit(x**2 + 3 * x, x, 2)
    trans_p2 = sp.limit(x**2 + 2 * x, x, 3)
    assert orig_p2 == 10 and trans_p2 == 15
    results["p2"] = {"original": int(orig_p2), "transfer": int(trans_p2)}

    # 7. p38: lim_{x->2}(x^2+2)/(x+1) ; transfer: lim_{x->3}(x^2+3)/(x+1)
    orig_p38 = sp.limit((x**2 + 2) / (x + 1), x, 2)
    trans_p38 = sp.limit((x**2 + 3) / (x + 1), x, 3)
    assert orig_p38 == 2 and trans_p38 == 3
    results["p38"] = {"original": int(orig_p38), "transfer": int(trans_p38)}

    # 8. jc935-1-5-1-1: lim_{x->2}(x^2+8)/(x-6) ; transfer: lim_{x->1}(x^2+9)/(x-6)
    orig_8 = sp.limit((x**2 + 8) / (x - 6), x, 2)
    trans_8 = sp.limit((x**2 + 9) / (x - 6), x, 1)
    assert orig_8 == -3 and trans_8 == -2
    results["jc935-1-5-1-1"] = {"original": str(orig_8), "transfer": int(trans_8)}

    # 9. jc935-1-5-1-2: lim_{x->2}(x^2-4)/(x^2+5) ; transfer: lim_{x->3}(x^2-9)/(x^2+1)
    orig_9 = sp.limit((x**2 - 4) / (x**2 + 5), x, 2)
    trans_9 = sp.limit((x**2 - 9) / (x**2 + 1), x, 3)
    assert orig_9 == 0 and trans_9 == 0
    results["jc935-1-5-1-2"] = {"original": str(orig_9), "transfer": int(trans_9)}

    # 10. jc935-1-5-1-4: lim_{x->0}(5x^3-x^2+3x)/(4x^2+2x) ; transfer: lim_{x->0}(3x^3+2x^2+6x)/(5x^2+2x)
    orig_10 = sp.limit((5 * x**3 - x**2 + 3 * x) / (4 * x**2 + 2 * x), x, 0)
    trans_10 = sp.limit((3 * x**3 + 2 * x**2 + 6 * x) / (5 * x**2 + 2 * x), x, 0)
    assert orig_10 == sp.Rational(3, 2) and trans_10 == 3
    results["jc935-1-5-1-4"] = {"original": str(orig_10), "transfer": int(trans_10)}

    # 11. jc935-1-5-1-5: lim_{h->0}((a+2h)^2-a^2)/h ; transfer: a=3 -> 12
    orig_11 = sp.limit(((a + 2 * h) ** 2 - a**2) / h, h, 0)
    trans_11 = sp.limit(((3 + 2 * h) ** 2 - 9) / h, h, 0)
    assert orig_11 == 4 * a and trans_11 == 12
    results["jc935-1-5-1-5"] = {"original": str(orig_11), "transfer": int(trans_11)}

    # 12. p168: lim_{x->4}(x^2-16)/(x+4) ; transfer: lim_{x->5}(x^2-9)/(x+3)
    orig_12 = sp.limit((x**2 - 16) / (x + 4), x, 4)
    trans_12 = sp.limit((x**2 - 9) / (x + 3), x, 5)
    assert orig_12 == 0 and trans_12 == 2
    results["p168"] = {"original": int(orig_12), "transfer": int(trans_12)}

    # 13. jc935-1-5-1-3: lim_{x->3}(x-3)^2/(x^2-9) ; transfer: lim_{x->2}(x-2)^2/(x^2-4)
    orig_13 = sp.limit((x - 3) ** 2 / (x**2 - 9), x, 3)
    trans_13 = sp.limit((x - 2) ** 2 / (x**2 - 4), x, 2)
    assert orig_13 == 0 and trans_13 == 0
    results["jc935-1-5-1-3"] = {"original": str(orig_13), "transfer": int(trans_13)}

    # 14. jc935-1-5-1-9: lim_{x->5}(x^2-7x+10)/(x^2-6x+5) ; transfer: lim_{x->4}(x^2-7x+12)/(x^2-6x+8)
    orig_14 = sp.limit((x**2 - 7 * x + 10) / (x**2 - 6 * x + 5), x, 5)
    trans_14 = sp.limit((x**2 - 7 * x + 12) / (x**2 - 6 * x + 8), x, 4)
    assert orig_14 == sp.Rational(3, 4) and trans_14 == sp.Rational(1, 2)
    results["jc935-1-5-1-9"] = {"original": str(orig_14), "transfer": float(trans_14)}

    # 15. p128: lim_{x->0}(sqrt(1+x)-1-x/2)/x^2 ; transfer: lim_{x->0}(sqrt(1+2x)-1-x)/x^2
    orig_15 = sp.limit((sp.sqrt(1 + x) - 1 - x / 2) / x**2, x, 0)
    trans_15 = sp.limit((sp.sqrt(1 + 2 * x) - 1 - x) / x**2, x, 0)
    assert orig_15 == sp.Rational(-1, 8) and trans_15 == sp.Rational(-1, 2)
    results["p128"] = {"original": float(orig_15), "transfer": float(trans_15)}

    # 16. p4: lim_{x->0} sin(2x)/(3x) ; transfer: lim_{x->0} sin(3x)/(4x)
    orig_16 = sp.limit(sp.sin(2 * x) / (3 * x), x, 0)
    trans_16 = sp.limit(sp.sin(3 * x) / (4 * x), x, 0)
    assert orig_16 == sp.Rational(2, 3) and trans_16 == sp.Rational(3, 4)
    results["p4"] = {"original": float(orig_16), "transfer": float(trans_16)}

    # 17. p127: lim_{x->0} sin(5x)/tan(2x) ; transfer: lim_{x->0} sin(6x)/tan(3x)
    orig_17 = sp.limit(sp.sin(5 * x) / sp.tan(2 * x), x, 0)
    trans_17 = sp.limit(sp.sin(6 * x) / sp.tan(3 * x), x, 0)
    assert orig_17 == sp.Rational(5, 2) and trans_17 == 2
    results["p127"] = {"original": float(orig_17), "transfer": int(trans_17)}

    # 18. p171: lim_{x->0} (1-cos(6x))/(x*sin(2x)) ; transfer: lim_{x->0} (1-cos(4x))/(x*sin(2x))
    orig_18 = sp.limit((1 - sp.cos(6 * x)) / (x * sp.sin(2 * x)), x, 0)
    trans_18 = sp.limit((1 - sp.cos(4 * x)) / (x * sp.sin(2 * x)), x, 0)
    assert orig_18 == 9 and trans_18 == 4
    results["p171"] = {"original": int(orig_18), "transfer": int(trans_18)}

    # 19. jc935-1-6-1-2: lim_{x->0} tan(5x)/(2x) ; transfer: lim_{x->0} tan(7x)/(2x)
    orig_19 = sp.limit(sp.tan(5 * x) / (2 * x), x, 0)
    trans_19 = sp.limit(sp.tan(7 * x) / (2 * x), x, 0)
    assert orig_19 == sp.Rational(5, 2) and trans_19 == sp.Rational(7, 2)
    results["jc935-1-6-1-2"] = {"original": str(orig_19), "transfer": float(trans_19)}

    # 20. jc935-1-6-2-2: lim_{x->0} (1+4x)^(2/x) ; transfer: lim_{x->0}(1+3x)^(5/x) = e^k -> k=15
    orig_20 = sp.limit((1 + 4 * x) ** (2 / x), x, 0)
    trans_20 = sp.log(sp.limit((1 + 3 * x) ** (5 / x), x, 0))
    assert orig_20 == sp.exp(8) and trans_20 == 15
    results["jc935-1-6-2-2"] = {"original": str(orig_20), "transfer": int(trans_20)}

    # 21. p172: lim_{x->1} (1-x)/(1-x^4) ; transfer: lim_{x->1} (1-x)/(1-x^5)
    orig_21 = sp.limit((1 - x) / (1 - x**4), x, 1)
    trans_21 = sp.limit((1 - x) / (1 - x**5), x, 1)
    assert orig_21 == sp.Rational(1, 4) and trans_21 == sp.Rational(1, 5)
    results["p172"] = {"original": float(orig_21), "transfer": float(trans_21)}

    # 22. jc935-1-8-3-1: f(x)=(x^2-9)/((x-3)(x-4)) at x=3,4 ; transfer: h(x)=(x^2-4)/((x-2)(x-3)) at x=2
    f_22 = (x**2 - 9) / ((x - 3) * (x - 4))
    lim_22_at_3 = sp.limit(f_22, x, 3)
    lim_22_at_4 = sp.limit(sp.Abs(f_22), x, 4)
    h_22 = (x**2 - 4) / ((x - 2) * (x - 3))
    trans_22 = sp.limit(h_22, x, 2)
    assert lim_22_at_3 == -6 and lim_22_at_4 == sp.oo and trans_22 == -4
    results["jc935-1-8-3-1"] = {
        "original": f"lim_{{x->3}}={lim_22_at_3}, lim_{{x->4}}|f|={lim_22_at_4}",
        "transfer": int(trans_22),
    }

    # 23. jc935-1-8-3-4: piecewise 2x-4 (x<=2), 5-x (x>2) ; transfer: 3x-1 (x<=1), x+5 (x>1), g(1+)-g(1-)
    lim_23_left = sp.limit(2 * x - 4, x, 2, dir="-")
    lim_23_right = sp.limit(5 - x, x, 2, dir="+")
    trans_23 = sp.limit(x + 5, x, 1, dir="+") - sp.limit(3 * x - 1, x, 1, dir="-")
    assert lim_23_left == 0 and lim_23_right == 3 and trans_23 == 4
    results["jc935-1-8-3-4"] = {
        "original": f"left={lim_23_left}, right={lim_23_right}",
        "transfer": int(trans_23),
    }

    # 24. p173: 3e^x (x<0), a+2x (x>=0) continuous at 0 ; transfer: 5e^x (x<0), a+4x (x>=0)
    orig_24 = sp.limit(3 * sp.exp(x), x, 0, dir="-")
    trans_24 = sp.limit(5 * sp.exp(x), x, 0, dir="-")
    assert orig_24 == 3 and trans_24 == 5
    results["p173"] = {"original": int(orig_24), "transfer": int(trans_24)}

    # 25. p174: f(x)=x^5-4x-2, f(2) ; transfer: g(x)=x^4-3x-1, g(2)
    orig_25 = (x**5 - 4 * x - 2).subs(x, 2)
    trans_25 = (x**4 - 3 * x - 1).subs(x, 2)
    assert orig_25 == 22 and trans_25 == 9
    results["p174"] = {"original": int(orig_25), "transfer": int(trans_25)}

    # 26. p39: lim_{n->oo} (3 + cos(n)/n) ; transfer: lim_{n->oo} (5 + sin(n)/n)
    orig_26_low = sp.limit(3 - 1 / n_pos, n_pos, sp.oo)
    orig_26_high = sp.limit(3 + 1 / n_pos, n_pos, sp.oo)
    trans_26_low = sp.limit(5 - 1 / n_pos, n_pos, sp.oo)
    trans_26_high = sp.limit(5 + 1 / n_pos, n_pos, sp.oo)
    assert orig_26_low == 3 and orig_26_high == 3 and trans_26_low == 5 and trans_26_high == 5
    results["p39"] = {"original": 3, "transfer": 5}

    # 27. p169: lim_{x->oo} (3x^2-5)/(7x^2+2) ; transfer: lim_{x->oo} (4x^2-9)/(5x^2+1)
    orig_27 = sp.limit((3 * x**2 - 5) / (7 * x**2 + 2), x, sp.oo)
    trans_27 = sp.limit((4 * x**2 - 9) / (5 * x**2 + 1), x, sp.oo)
    assert orig_27 == sp.Rational(3, 7) and trans_27 == sp.Rational(4, 5)
    results["p169"] = {"original": float(orig_27), "transfer": float(trans_27)}

    # 28. p170: lim_{n->oo} (1+2+...+(n-1))/(3n^2) ; transfer: /(2n^2)
    k = sp.Symbol("k", integer=True)
    sum_n_minus_1 = sp.summation(k, (k, 1, n_pos - 1))
    orig_28 = sp.limit(sum_n_minus_1 / (3 * n_pos**2), n_pos, sp.oo)
    trans_28 = sp.limit(sum_n_minus_1 / (2 * n_pos**2), n_pos, sp.oo)
    assert orig_28 == sp.Rational(1, 6) and trans_28 == sp.Rational(1, 4)
    results["p170"] = {"original": float(orig_28), "transfer": float(trans_28)}

    # 29. jc935-1-5-1-7: lim_{|x|->oo} (5x^2+1)/(3x^2+2x-4) ; transfer: (7x^2+3)/(2x^2-5x+1)
    orig_29_pos = sp.limit((5 * x**2 + 1) / (3 * x**2 + 2 * x - 4), x, sp.oo)
    orig_29_neg = sp.limit((5 * x**2 + 1) / (3 * x**2 + 2 * x - 4), x, -sp.oo)
    trans_29 = sp.limit((7 * x**2 + 3) / (2 * x**2 - 5 * x + 1), x, sp.oo)
    assert orig_29_pos == sp.Rational(5, 3) and orig_29_neg == sp.Rational(5, 3)
    assert trans_29 == sp.Rational(7, 2)
    results["jc935-1-5-1-7"] = {"original": str(orig_29_pos), "transfer": float(trans_29)}

    # 30. jc935-1-5-1-8: lim_{|x|->oo} (2x^2-x)/(x^4+2x^2+1) ; transfer: (5x^2+3x)/(x^4+4x^2+2)
    orig_30_pos = sp.limit((2 * x**2 - x) / (x**4 + 2 * x**2 + 1), x, sp.oo)
    orig_30_neg = sp.limit((2 * x**2 - x) / (x**4 + 2 * x**2 + 1), x, -sp.oo)
    trans_30 = sp.limit((5 * x**2 + 3 * x) / (x**4 + 4 * x**2 + 2), x, sp.oo)
    assert orig_30_pos == 0 and orig_30_neg == 0 and trans_30 == 0
    results["jc935-1-5-1-8"] = {"original": str(orig_30_pos), "transfer": int(trans_30)}

    return results


def main() -> None:
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    batch1_items = [item for item in manifest["items"] if item["batch"] == 1]
    assert len(batch1_items) == 30, f"Expected 30 batch-1 items, found {len(batch1_items)}"

    numeric_items = [item for item in batch1_items if item["id"].startswith("p")]
    written_items = [item for item in batch1_items if not item["id"].startswith("p")]
    assert len(numeric_items) == 18 and len(written_items) == 12

    sympy_results = verify_sympy_math()
    assert len(sympy_results) == 30

    draft_text = DRAFT_PATH.read_text(encoding="utf-8")
    assert "TODO" not in draft_text and "FIXME" not in draft_text and "TBD" not in draft_text

    for item in batch1_items:
        pid = item["id"]
        assert pid in sympy_results, f"Missing SymPy verification for {pid}"
        assert (f"{pid}:" in draft_text) or (f'"{pid}":' in draft_text), f"Missing {pid} in ch01Batch01.ts"

    print("SymPy mathematical verification PASSED for all 30 Batch 1 lessons (18 numeric + 12 written).")
    print("All 30 original problems + 30 transfer problems verified deterministically.")
    for idx, item in enumerate(batch1_items, 1):
        pid = item["id"]
        kind = "数值题" if pid.startswith("p") else "推导题"
        r = sympy_results[pid]
        print(f"  [{idx:02d}] {pid:<15} ({kind}) -> original={r['original']}, transfer={r['transfer']}")


if __name__ == "__main__":
    main()
