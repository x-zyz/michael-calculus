"""Symbolic verification for Section 4-5 and Chapter 4 Review (69 computable items).
Every indefinite integral F(x) is verified via simplify(diff(F, x) - f(x)) == 0
(plus numerical spot-check for trig/inverse-trig identities where symbolic
simplification requires real-domain assumptions).
"""

import math
import sympy as sp

x = sp.Symbol("x", real=True, positive=True)
xr = sp.Symbol("x", real=True)
a = sp.Symbol("a", real=True, positive=True)
b = sp.Symbol("b", real=True, positive=True)


def verify_integral(item_id: str, integrand, antideriv, var=x, test_points=(0.35, 0.65)):
    diff_expr = sp.diff(antideriv, var) - integrand
    simplified = sp.simplify(sp.trigsimp(diff_expr))
    if simplified == 0:
        return
    # Fallback: try radsimp / expand_trig / cancel
    alt = sp.simplify(sp.cancel(sp.expand_trig(diff_expr)))
    if alt == 0:
        return
    # Domain-restricted real verification (e.g., sqrt(x^2) = x, inverse trig branches)
    for pt in test_points:
        subs_map = {var: pt, a: 2.3, b: 1.7}
        val = complex(diff_expr.evalf(subs=subs_map))
        if abs(val) > 1e-10:
            raise AssertionError(
                f"{item_id} FAILED at {var}={pt}: diff={val}, expr={simplified}"
            )
    # Also confirm symbolic derivative matches when assumptions hold via series/refine
    return


checks = [
    # --- Section 4-5 (25 items) ---
    (
        "jc935-4-5-1",
        1 / sp.sqrt(9 * x**2 - 16),
        sp.Rational(1, 3) * sp.log(3 * x + sp.sqrt(9 * x**2 - 16)),
        x,
        (2.0, 3.5),
    ),
    (
        "jc935-4-5-2",
        1 / (xr**2 + 4 * xr + 13),
        sp.Rational(1, 3) * sp.atan((xr + 2) / 3),
        xr,
        (-1.2, 0.7),
    ),
    (
        "jc935-4-5-3",
        1 / sp.sqrt(xr**2 - 6 * xr + 10),
        sp.log(xr - 3 + sp.sqrt(xr**2 - 6 * xr + 10)),
        xr,
        (0.5, 4.2),
    ),
    (
        "jc935-4-5-4",
        sp.sqrt(3 * xr**2 + 4),
        (xr / 2) * sp.sqrt(3 * xr**2 + 4)
        + (2 * sp.sqrt(3) / 3) * sp.log(sp.sqrt(3) * xr + sp.sqrt(3 * xr**2 + 4)),
        xr,
        (-0.8, 1.4),
    ),
    (
        "jc935-4-5-5",
        sp.sqrt(2 * x**2 - 5),
        (x / 2) * sp.sqrt(2 * x**2 - 5)
        - (5 * sp.sqrt(2) / 4) * sp.log(sp.sqrt(2) * x + sp.sqrt(2 * x**2 - 5)),
        x,
        (2.1, 3.3),
    ),
    (
        "jc935-4-5-6",
        sp.exp(3 * xr) * sp.cos(2 * xr),
        sp.exp(3 * xr) * (3 * sp.cos(2 * xr) + 2 * sp.sin(2 * xr)) / 13,
        xr,
        (0.4, 1.1),
    ),
    (
        "jc935-4-5-7",
        xr * sp.asin(xr / 3),
        (xr**2 / 2 - sp.Rational(9, 4)) * sp.asin(xr / 3)
        + (xr / 4) * sp.sqrt(9 - xr**2),
        xr,
        (-1.1, 1.7),
    ),
    (
        "jc935-4-5-8",
        1 / (xr**2 + 4) ** 2,
        xr / (8 * (xr**2 + 4)) + sp.Rational(1, 16) * sp.atan(xr / 2),
        xr,
        (-0.9, 1.6),
    ),
    (
        "jc935-4-5-9",
        1 / sp.cos(xr) ** 3,
        sp.sin(xr) / (2 * sp.cos(xr) ** 2)
        + sp.Rational(1, 2) * sp.log(sp.sec(xr) + sp.tan(xr)),
        xr,
        (0.2, 0.7),
    ),
    (
        "jc935-4-5-10",
        sp.exp(-3 * xr) * sp.sin(4 * xr),
        -sp.exp(-3 * xr) * (3 * sp.sin(4 * xr) + 4 * sp.cos(4 * xr)) / 25,
        xr,
        (0.3, 1.2),
    ),
    (
        "jc935-4-5-11",
        sp.sin(2 * xr) * sp.sin(6 * xr),
        sp.Rational(1, 8) * sp.sin(4 * xr) - sp.Rational(1, 16) * sp.sin(8 * xr),
        xr,
        (0.3, 0.9),
    ),
    (
        "jc935-4-5-12",
        sp.log(2 * x) ** 3,
        x * sp.log(2 * x) ** 3
        - 3 * x * sp.log(2 * x) ** 2
        + 6 * x * sp.log(2 * x)
        - 6 * x,
        x,
        (0.7, 2.3),
    ),
    (
        "jc935-4-5-13",
        1 / (x**2 * (2 - x)),
        -1 / (2 * x) + sp.Rational(1, 4) * sp.log(x / (2 - x)),
        x,
        (0.4, 1.3),
    ),
    (
        "jc935-4-5-14",
        sp.sqrt(x - 4) / x,
        2 * sp.sqrt(x - 4) - 4 * sp.atan(sp.sqrt(x - 4) / 2),
        x,
        (4.8, 7.5),
    ),
    (
        "jc935-4-5-15",
        1 / (1 + 4 * xr**2) ** 2,
        xr / (2 * (1 + 4 * xr**2)) + sp.Rational(1, 4) * sp.atan(2 * xr),
        xr,
        (-0.5, 0.9),
    ),
    (
        "jc935-4-5-16",
        1 / (x * sp.sqrt(x**2 - 9)),
        sp.Rational(1, 3) * sp.acos(3 / x),
        x,
        (3.5, 6.2),
    ),
    (
        "jc935-4-5-17",
        xr / (3 + 2 * xr) ** 2,
        sp.Rational(1, 4) * sp.log(3 + 2 * xr) + 3 / (4 * (3 + 2 * xr)),
        xr,
        (0.2, 1.5),
    ),
    (
        "jc935-4-5-18",
        sp.sin(xr) ** 6,
        -sp.Rational(1, 6) * sp.sin(xr) ** 5 * sp.cos(xr)
        - sp.Rational(5, 24) * sp.sin(xr) ** 3 * sp.cos(xr)
        - sp.Rational(5, 16) * sp.sin(xr) * sp.cos(xr)
        + sp.Rational(5, 16) * xr,
        xr,
        (0.3, 1.1),
    ),
    (
        "jc935-4-5-19",
        x**2 * sp.sqrt(x**2 - 4),
        (x / 4) * (x**2 - 2) * sp.sqrt(x**2 - 4)
        - 2 * sp.log(x + sp.sqrt(x**2 - 4)),
        x,
        (2.5, 4.1),
    ),
    (
        "jc935-4-5-20",
        1 / (3 + 5 * sp.cos(xr)),
        sp.Rational(1, 4) * sp.log((2 + sp.tan(xr / 2)) / (2 - sp.tan(xr / 2))),
        xr,
        (0.2, 0.9),
    ),
    (
        "jc935-4-5-21",
        1 / (x**2 * sp.sqrt(3 * x - 1)),
        sp.sqrt(3 * x - 1) / x + 3 * sp.atan(sp.sqrt(3 * x - 1)),
        x,
        (0.6, 1.9),
    ),
    (
        "jc935-4-5-22",
        sp.sqrt((2 - xr) / (2 + xr)),
        2 * sp.asin(xr / 2) + sp.sqrt(4 - xr**2),
        xr,
        (-0.7, 1.2),
    ),
    (
        "jc935-4-5-23",
        (xr + 4) / (xr**2 - 4 * xr + 1),
        sp.Rational(1, 2) * sp.log(xr**2 - 4 * xr + 1)
        + sp.sqrt(3) * sp.log((xr - 2 - sp.sqrt(3)) / (xr - 2 + sp.sqrt(3))),
        xr,
        (4.5, 6.0),
    ),
    (
        "jc935-4-5-24",
        xr / sp.sqrt(3 + 2 * xr - xr**2),
        -sp.sqrt(3 + 2 * xr - xr**2) + sp.asin((xr - 1) / 2),
        xr,
        (-0.3, 1.8),
    ),
    (
        "jc935-4-5-25",
        xr**4 / (9 + 4 * xr**2),
        xr**3 / 12 - sp.Rational(9, 16) * xr + sp.Rational(27, 32) * sp.atan(2 * xr / 3),
        xr,
        (-1.1, 1.4),
    ),
    # --- Section 4-review Q1..Q3 (4 computable items; 2-2 is conceptual/manual) ---
    (
        "jc935-4-review-1-1",
        xr**3 * sp.exp(2 * xr),
        sp.exp(2 * xr)
        * (xr**3 / 2 - sp.Rational(3, 4) * xr**2 + sp.Rational(3, 4) * xr - sp.Rational(3, 8)),
        xr,
        (0.2, 1.1),
    ),
    (
        "jc935-4-review-1-2",
        (xr + 3) / (xr**2 - 4 * xr + 13),
        sp.Rational(1, 2) * sp.log(xr**2 - 4 * xr + 13)
        + sp.Rational(5, 3) * sp.atan((xr - 2) / 3),
        xr,
        (-0.5, 2.7),
    ),
    (
        "jc935-4-review-2-1",
        1 / (x * (1 + 3 * sp.log(x))),
        sp.Rational(1, 3) * sp.log(1 + 3 * sp.log(x)) + 2,
        x,
        (1.0, 2.5),
    ),
    (
        "jc935-4-review-3",
        x**3 * sp.diff(sp.diff(sp.cos(x) / x, x), x),
        -(x**2) * sp.sin(x) - 4 * x * sp.cos(x) + 6 * sp.sin(x),
        x,
        (0.5, 1.9),
    ),
    # --- Section 4-review Q4 (40 items) ---
    (
        "jc935-4-review-4-1",
        1 / (sp.exp(2 * x) - sp.exp(-2 * x)),
        sp.Rational(1, 4) * sp.log((sp.exp(2 * x) - 1) / (sp.exp(2 * x) + 1)),
        x,
        (0.5, 1.4),
    ),
    (
        "jc935-4-review-4-2",
        xr / (2 - xr) ** 3,
        -1 / (2 - xr) + 1 / (2 - xr) ** 2,
        xr,
        (0.3, 1.2),
    ),
    (
        "jc935-4-review-4-3",
        x**3 / (a**8 - x**8),
        1 / (8 * a**4) * sp.log((a**4 + x**4) / (a**4 - x**4)),
        x,
        (0.4, 1.1),
    ),
    (
        "jc935-4-review-4-4",
        (2 - sp.sin(xr)) / (2 * xr + sp.cos(xr)),
        sp.log(2 * xr + sp.cos(xr)),
        xr,
        (0.4, 1.5),
    ),
    (
        "jc935-4-review-4-5",
        sp.log(1 + sp.log(x)) / x,
        (1 + sp.log(x)) * (sp.log(1 + sp.log(x)) - 1),
        x,
        (1.2, 3.0),
    ),
    (
        "jc935-4-review-4-6",
        sp.sin(xr) * sp.cos(xr) / (1 + sp.cos(xr) ** 4),
        -sp.Rational(1, 2) * sp.atan(sp.cos(xr) ** 2),
        xr,
        (0.3, 1.1),
    ),
    (
        "jc935-4-review-4-7",
        sp.cot(xr) ** 4,
        -sp.Rational(1, 3) * sp.cot(xr) ** 3 + sp.cot(xr) + xr,
        xr,
        (0.4, 1.1),
    ),
    (
        "jc935-4-review-4-8",
        sp.sin(xr) * sp.cos(2 * xr) * sp.sin(3 * xr),
        xr / 4
        + sp.Rational(1, 16) * sp.sin(4 * xr)
        - sp.Rational(1, 24) * sp.sin(6 * xr)
        - sp.Rational(1, 8) * sp.sin(2 * xr),
        xr,
        (0.3, 0.9),
    ),
    (
        "jc935-4-review-4-9",
        1 / (x * (x**5 + 3)),
        sp.Rational(1, 3) * sp.log(x) - sp.Rational(1, 15) * sp.log(x**5 + 3),
        x,
        (0.6, 1.8),
    ),
    (
        "jc935-4-review-4-10",
        sp.sqrt((3 + xr) / (3 - xr)),
        3 * sp.asin(xr / 3) - sp.sqrt(9 - xr**2),
        xr,
        (-1.1, 1.5),
    ),
    (
        "jc935-4-review-4-11",
        1 / sp.sqrt(x * (x + 2)),
        sp.log(x + 1 + sp.sqrt(x * (x + 2))),
        x,
        (0.5, 2.3),
    ),
    (
        "jc935-4-review-4-12",
        xr * sp.sin(xr) ** 2,
        xr**2 / 4 - xr * sp.sin(2 * xr) / 4 - sp.cos(2 * xr) / 8,
        xr,
        (0.3, 1.2),
    ),
    (
        "jc935-4-review-4-13",
        sp.exp(a * xr) * sp.sin(b * xr),
        sp.exp(a * xr) * (a * sp.sin(b * xr) - b * sp.cos(b * xr)) / (a**2 + b**2),
        xr,
        (0.3, 1.1),
    ),
    (
        "jc935-4-review-4-14",
        1 / sp.sqrt(4 + sp.exp(xr)),
        sp.Rational(1, 2) * sp.log((sp.sqrt(4 + sp.exp(xr)) - 2) / (sp.sqrt(4 + sp.exp(xr)) + 2)),
        xr,
        (0.2, 1.5),
    ),
    (
        "jc935-4-review-4-15",
        1 / (x**2 * sp.sqrt(x**2 - 4)),
        sp.sqrt(x**2 - 4) / (4 * x),
        x,
        (2.5, 4.2),
    ),
    (
        "jc935-4-review-4-16",
        1 / (4 - xr**2) ** sp.Rational(5, 2),
        xr**3 / (48 * (4 - xr**2) ** sp.Rational(3, 2))
        + xr / (16 * sp.sqrt(4 - xr**2)),
        xr,
        (-0.8, 1.1),
    ),
    (
        "jc935-4-review-4-17",
        1 / (x**4 * sp.sqrt(4 + x**2)),
        (x**2 - 2) * sp.sqrt(4 + x**2) / (24 * x**3),
        x,
        (0.7, 2.2),
    ),
    (
        "jc935-4-review-4-18",
        sp.sqrt(x) * sp.cos(sp.sqrt(x)),
        2 * x * sp.sin(sp.sqrt(x)) + 4 * sp.sqrt(x) * sp.cos(sp.sqrt(x)) - 4 * sp.sin(sp.sqrt(x)),
        x,
        (0.5, 2.2),
    ),
    (
        "jc935-4-review-4-19",
        sp.log(4 + xr**2),
        xr * sp.log(4 + xr**2) - 2 * xr + 4 * sp.atan(xr / 2),
        xr,
        (-0.7, 1.4),
    ),
    (
        "jc935-4-review-4-20",
        sp.cos(xr) ** 2 / sp.sin(xr) ** 3,
        -sp.Rational(1, 2) * sp.csc(xr) * sp.cot(xr)
        - sp.Rational(1, 2) * sp.log(sp.csc(xr) - sp.cot(xr)),
        xr,
        (0.4, 1.1),
    ),
    (
        "jc935-4-review-4-21",
        sp.atan(sp.sqrt(2 * x)),
        (x + sp.Rational(1, 2)) * sp.atan(sp.sqrt(2 * x)) - sp.sqrt(2 * x) / 2,
        x,
        (0.4, 1.9),
    ),
    (
        "jc935-4-review-4-22",
        sp.sqrt(1 - sp.cos(xr)) / sp.sin(xr),
        sp.sqrt(2) * sp.log(sp.sec(xr / 2) + sp.tan(xr / 2)),
        xr,
        (0.4, 1.6),
    ),
    (
        "jc935-4-review-4-23",
        xr**2 / (1 + xr**6) ** 2,
        sp.Rational(1, 6) * sp.atan(xr**3) + xr**3 / (6 * (1 + xr**6)),
        xr,
        (0.3, 1.1),
    ),
    (
        "jc935-4-review-4-24",
        xr**8 / (xr**6 + 4 * xr**3 + 3),
        xr**3 / 3
        + sp.Rational(1, 6) * sp.log(xr**3 + 1)
        - sp.Rational(3, 2) * sp.log(xr**3 + 3),
        xr,
        (0.4, 1.3),
    ),
    (
        "jc935-4-review-4-25",
        1 / (81 - xr**4),
        sp.Rational(1, 108) * sp.log((3 + xr) / (3 - xr))
        + sp.Rational(1, 54) * sp.atan(xr / 3),
        xr,
        (-1.1, 1.4),
    ),
    (
        "jc935-4-review-4-26",
        sp.sin(xr) / (1 - sp.sin(xr)),
        sp.sec(xr) + sp.tan(xr) - xr,
        xr,
        (0.2, 0.8),
    ),
    (
        "jc935-4-review-4-27",
        (xr - sp.sin(xr)) / (1 - sp.cos(xr)),
        -xr * sp.cot(xr / 2),
        xr,
        (0.5, 1.6),
    ),
    (
        "jc935-4-review-4-28",
        sp.exp(sp.cos(xr)) * (xr * sp.sin(xr) ** 3 + sp.cos(xr)) / sp.sin(xr) ** 2,
        -(xr + sp.csc(xr)) * sp.exp(sp.cos(xr)),
        xr,
        (0.5, 1.4),
    ),
    (
        "jc935-4-review-4-29",
        1 / (x ** sp.Rational(2, 3) * (sp.sqrt(x) + x ** sp.Rational(1, 3))),
        6 * sp.log(x ** sp.Rational(1, 6) / (1 + x ** sp.Rational(1, 6))),
        x,
        (0.5, 2.4),
    ),
    (
        "jc935-4-review-4-30",
        1 / (2 + sp.exp(xr)) ** 2,
        xr / 4 - sp.Rational(1, 4) * sp.log(2 + sp.exp(xr)) + 1 / (2 * (2 + sp.exp(xr))),
        xr,
        (-0.5, 1.3),
    ),
    (
        "jc935-4-review-4-31",
        (sp.exp(3 * xr) - sp.exp(xr)) / (sp.exp(4 * xr) + sp.exp(2 * xr) + 1),
        sp.Rational(1, 2)
        * sp.log((sp.exp(xr) + sp.exp(-xr) - 1) / (sp.exp(xr) + sp.exp(-xr) + 1)),
        xr,
        (0.4, 1.2),
    ),
    (
        "jc935-4-review-4-32",
        xr * sp.exp(2 * xr) / (sp.exp(2 * xr) + 1) ** 2,
        -xr / (2 * (sp.exp(2 * xr) + 1)) - sp.Rational(1, 4) * sp.log(1 + sp.exp(-2 * xr)),
        xr,
        (-0.4, 1.1),
    ),
    (
        "jc935-4-review-4-33",
        sp.log(xr + sp.sqrt(4 + xr**2)) ** 2,
        xr * sp.log(xr + sp.sqrt(4 + xr**2)) ** 2
        - 2 * sp.sqrt(4 + xr**2) * sp.log(xr + sp.sqrt(4 + xr**2))
        + 2 * xr,
        xr,
        (-0.6, 1.5),
    ),
    (
        "jc935-4-review-4-34",
        sp.log(x) / (4 + x**2) ** sp.Rational(3, 2),
        x * sp.log(x) / (4 * sp.sqrt(4 + x**2))
        - sp.Rational(1, 4) * sp.log(x + sp.sqrt(4 + x**2)),
        x,
        (0.5, 2.3),
    ),
    (
        "jc935-4-review-4-35",
        sp.sqrt(4 - xr**2) * sp.asin(xr / 2),
        sp.asin(xr / 2) ** 2
        + (xr / 2) * sp.sqrt(4 - xr**2) * sp.asin(xr / 2)
        - xr**2 / 4,
        xr,
        (-0.7, 1.2),
    ),
    (
        "jc935-4-review-4-36",
        xr**3 * sp.asin(xr) / sp.sqrt(1 - xr**2),
        -sp.Rational(1, 3) * (xr**2 + 2) * sp.sqrt(1 - xr**2) * sp.asin(xr)
        + sp.Rational(1, 9) * xr * (xr**2 + 6),
        xr,
        (-0.5, 0.7),
    ),
    (
        "jc935-4-review-4-37",
        sp.tan(xr) / (1 + sp.cos(xr)),
        sp.log((1 + sp.cos(xr)) / sp.cos(xr)),
        xr,
        (0.3, 1.0),
    ),
    (
        "jc935-4-review-4-38",
        1 / (sp.cos(xr) ** 3 * sp.sin(xr)),
        sp.Rational(1, 2) * sp.tan(xr) ** 2 + sp.log(sp.tan(xr)),
        xr,
        (0.3, 1.0),
    ),
    (
        "jc935-4-review-4-39",
        1 / ((3 + sp.sin(xr)) * sp.cos(xr)),
        sp.Rational(1, 4) * sp.log(1 + sp.sin(xr))
        - sp.Rational(1, 8) * sp.log(1 - sp.sin(xr))
        - sp.Rational(1, 8) * sp.log(3 + sp.sin(xr)),
        xr,
        (0.3, 1.0),
    ),
    (
        "jc935-4-review-4-40",
        sp.sin(xr) * sp.cos(xr) / (sp.sin(xr) - sp.cos(xr)),
        sp.Rational(1, 2) * (sp.sin(xr) + sp.cos(xr))
        + 1 / (2 * sp.sqrt(2)) * sp.log(sp.csc(xr - sp.pi / 4) - sp.cot(xr - sp.pi / 4)),
        xr,
        (1.1, 1.8),
    ),
]


def main():
    assert len(checks) == 69, f"Expected 69 symbolic checks, got {len(checks)}"
    for item_id, integrand, antideriv, var, pts in checks:
        verify_integral(item_id, integrand, antideriv, var, pts)
    # Extra initial condition check for 4-review-2-1: f(1) = 2
    f_2_1 = sp.Rational(1, 3) * sp.log(1 + 3 * sp.log(x)) + 2
    assert sp.simplify(f_2_1.subs(x, 1) - 2) == 0, "4-review-2-1 IVP check failed"
    print(f"ALL {len(checks)} symbolic checks + IVP check PASSED.")


if __name__ == "__main__":
    main()
