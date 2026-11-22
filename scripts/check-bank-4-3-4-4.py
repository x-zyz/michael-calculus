"""Symbolic verification for Chapters 4-3 and 4-4 indefinite integral bank items.

Every antiderivative F(x) is verified via symbolic differentiation:
    simplify(diff(F(x), x) - integrand(x)) == 0
on an appropriate real sub-domain (and cross-checked numerically where trig/radical
branch simplification benefits from an extra guard).
"""

import sympy as sp


def check_antiderivative(item_id, var, integrand, antideriv, domain_pt=None, domain_sub=None):
    diff_expr = sp.diff(antideriv, var) - integrand
    check_expr = diff_expr.subs(var, domain_sub) if domain_sub is not None else diff_expr
    simplified = sp.simplify(sp.trigsimp(check_expr))
    if simplified != 0:
        simplified = sp.simplify(sp.factor(sp.together(check_expr)))
    if simplified != 0:
        rewritten = sp.simplify(
            sp.trigsimp(check_expr.rewrite(sp.tan).expand())
        )
        if rewritten == 0:
            simplified = 0
        else:
            rewritten2 = sp.simplify(check_expr.rewrite(sp.exp))
            if rewritten2 == 0:
                simplified = 0
    assert simplified == 0, (
        f"[{item_id}] Symbolic check failed: diff(F) - f = {simplified}"
    )
    if domain_pt is not None:
        exact_pt = sp.nsimplify(domain_pt)
        val = complex(diff_expr.subs(var, exact_pt).evalf(30))
        assert abs(val) < 1e-20, (
            f"[{item_id}] Numerical guard failed at {domain_pt}: {val}"
        )


def main():
    x = sp.Symbol("x", real=True)
    xp = sp.Symbol("x", positive=True)
    t = sp.Symbol("t", real=True)
    # Restricted real symbols for branch-sensitive radicals / logs
    x_gt2 = sp.Symbol("x", real=True, positive=True)
    x_unit = sp.Symbol("x", real=True)  # used with numerical guard in (0, 1)

    p = sp.Symbol("p", positive=True)

    checks = [
        # ---------------- Section 4-3: Integration by Parts (24 items) ----------------
        (
            "jc935-4-3-1",
            x,
            x * sp.sin(2 * x),
            -sp.Rational(1, 2) * x * sp.cos(2 * x) + sp.Rational(1, 4) * sp.sin(2 * x),
            0.7,
        ),
        (
            "jc935-4-3-2",
            xp,
            sp.log(2 * xp + 1),
            (xp + sp.Rational(1, 2)) * sp.log(2 * xp + 1) - xp,
            1.3,
        ),
        (
            "jc935-4-3-3",
            x,
            sp.acos(x),
            x * sp.acos(x) - sp.sqrt(1 - x**2),
            0.4,
        ),
        (
            "jc935-4-3-4",
            x,
            x * sp.exp(2 * x),
            (sp.Rational(1, 2) * x - sp.Rational(1, 4)) * sp.exp(2 * x),
            0.5,
        ),
        (
            "jc935-4-3-5",
            xp,
            xp**3 * sp.log(xp),
            sp.Rational(1, 4) * xp**4 * sp.log(xp) - sp.Rational(1, 16) * xp**4,
            1.5,
        ),
        (
            "jc935-4-3-6",
            x,
            sp.exp(2 * x) * sp.cos(x),
            sp.exp(2 * x) * (2 * sp.cos(x) + sp.sin(x)) / 5,
            0.6,
        ),
        (
            "jc935-4-3-7",
            x,
            sp.exp(-3 * x) * sp.sin(2 * x),
            -sp.exp(-3 * x) * (3 * sp.sin(2 * x) + 2 * sp.cos(2 * x)) / 13,
            0.6,
        ),
        (
            "jc935-4-3-8",
            x,
            x * sp.cos(x / 3),
            3 * x * sp.sin(x / 3) + 9 * sp.cos(x / 3),
            0.9,
        ),
        (
            "jc935-4-3-9",
            x,
            x**3 * sp.atan(x),
            sp.Rational(1, 4) * (x**4 - 1) * sp.atan(x)
            - sp.Rational(1, 12) * x**3
            + sp.Rational(1, 4) * x,
            0.8,
        ),
        (
            "jc935-4-3-10",
            x,
            x * sp.cot(x) ** 2,
            -x * sp.cot(x) + sp.log(sp.sin(x)) - sp.Rational(1, 2) * x**2,
            0.7,
        ),
        (
            "jc935-4-3-11",
            x,
            x**2 * sp.sin(x),
            -(x**2 - 2) * sp.cos(x) + 2 * x * sp.sin(x),
            0.7,
        ),
        (
            "jc935-4-3-12",
            t,
            t * sp.exp(-3 * t),
            -sp.Rational(1, 3) * t * sp.exp(-3 * t) - sp.Rational(1, 9) * sp.exp(-3 * t),
            0.7,
        ),
        (
            "jc935-4-3-13",
            xp,
            sp.log(xp + 1) ** 2,
            (xp + 1) * sp.log(xp + 1) ** 2 - 2 * (xp + 1) * sp.log(xp + 1) + 2 * xp,
            1.4,
        ),
        (
            "jc935-4-3-14",
            x,
            x * sp.sin(2 * x) * sp.cos(2 * x),
            -sp.Rational(1, 8) * x * sp.cos(4 * x) + sp.Rational(1, 32) * sp.sin(4 * x),
            0.5,
        ),
        (
            "jc935-4-3-15",
            x,
            x**2 * sp.sin(x / 2) ** 2,
            sp.Rational(1, 6) * x**3
            - sp.Rational(1, 2) * x**2 * sp.sin(x)
            - x * sp.cos(x)
            + sp.sin(x),
            0.8,
        ),
        (
            "jc935-4-3-16",
            xp,
            xp * sp.log(xp + 2),
            sp.Rational(1, 2) * (xp**2 - 4) * sp.log(xp + 2)
            - sp.Rational(1, 4) * xp**2
            + xp,
            1.2,
        ),
        (
            "jc935-4-3-17",
            x,
            (x**2 + 2) * sp.cos(3 * x),
            (sp.Rational(1, 3) * x**2 + sp.Rational(16, 27)) * sp.sin(3 * x)
            + sp.Rational(2, 9) * x * sp.cos(3 * x),
            0.5,
        ),
        (
            "jc935-4-3-18",
            xp,
            sp.log(xp) ** 3 / xp**3,
            -(4 * sp.log(xp) ** 3 + 6 * sp.log(xp) ** 2 + 6 * sp.log(xp) + 3)
            / (8 * xp**2),
            2.1,
        ),
        (
            "jc935-4-3-19",
            xp,
            sp.exp(2 * xp ** sp.Rational(1, 3)),
            sp.Rational(3, 4)
            * sp.exp(2 * xp ** sp.Rational(1, 3))
            * (2 * xp ** sp.Rational(2, 3) - 2 * xp ** sp.Rational(1, 3) + 1),
            1.8,
        ),
        (
            "jc935-4-3-20",
            xp,
            sp.sin(sp.log(xp)),
            xp * (sp.sin(sp.log(xp)) - sp.cos(sp.log(xp))) / 2,
            2.3,
        ),
        (
            "jc935-4-3-21",
            x,
            sp.acos(x) ** 2,
            x * sp.acos(x) ** 2 - 2 * sp.sqrt(1 - x**2) * sp.acos(x) - 2 * x,
            0.35,
        ),
        (
            "jc935-4-3-22",
            x,
            sp.exp(2 * x) * sp.cos(x) ** 2,
            sp.Rational(1, 4) * sp.exp(2 * x)
            + sp.Rational(1, 8) * sp.exp(2 * x) * (sp.cos(2 * x) + sp.sin(2 * x)),
            0.6,
        ),
        (
            "jc935-4-3-23",
            xp,
            xp**2 * sp.log(xp) ** 2,
            xp**3 * (9 * sp.log(xp) ** 2 - 6 * sp.log(xp) + 2) / 27,
            1.7,
        ),
        (
            "jc935-4-3-24",
            xp,
            sp.exp(sp.sqrt(2 * xp + 1)),
            (sp.sqrt(2 * xp + 1) - 1) * sp.exp(sp.sqrt(2 * xp + 1)),
            1.5,
        ),
        # ---------------- Section 4-4: Rational & Rationalizable Integrals (24 items) ----------------
        (
            "jc935-4-4-1",
            x,
            x**3 / (x - 2),
            sp.Rational(1, 3) * x**3 + x**2 + 4 * x + 8 * sp.log(x - 2),
            3.5,
        ),
        (
            "jc935-4-4-2",
            x,
            (2 * x - 5) / (x**2 - 5 * x + 4),
            sp.log(x**2 - 5 * x + 4),
            5.5,
        ),
        (
            "jc935-4-4-3",
            x,
            (x + 2) / (x**2 + 2 * x + 10),
            sp.Rational(1, 2) * sp.log(x**2 + 2 * x + 10)
            + sp.Rational(1, 3) * sp.atan((x + 1) / 3),
            1.2,
        ),
        (
            "jc935-4-4-4",
            xp,
            1 / (xp * (xp**2 + 4)),
            sp.Rational(1, 4) * sp.log(xp) - sp.Rational(1, 8) * sp.log(xp**2 + 4),
            1.5,
        ),
        (
            "jc935-4-4-5",
            x,
            12 / (x**3 - 8),
            sp.log(x - 2)
            - sp.Rational(1, 2) * sp.log(x**2 + 2 * x + 4)
            - sp.sqrt(3) * sp.atan((x + 1) / sp.sqrt(3)),
            3.2,
        ),
        (
            "jc935-4-4-6",
            x,
            (x**2 + 2 * x + 3) / ((x - 1) ** 2 * (x + 1)),
            sp.Rational(1, 2) * sp.log(x**2 - 1) - 3 / (x - 1),
            2.4,
        ),
        (
            "jc935-4-4-7",
            x,
            x / ((x - 1) * (x - 2) * (x - 3)),
            sp.Rational(1, 2) * sp.log(x - 1)
            - 2 * sp.log(x - 2)
            + sp.Rational(3, 2) * sp.log(x - 3),
            4.5,
        ),
        (
            "jc935-4-4-8",
            x,
            (x**5 + 2 * x**4 - 16) / (x**3 - 4 * x),
            sp.Rational(1, 3) * x**3
            + x**2
            + 4 * x
            + 4 * sp.log(x)
            + 6 * sp.log(x - 2)
            - 2 * sp.log(x + 2),
            3.5,
        ),
        (
            "jc935-4-4-9",
            x,
            16 / ((x**2 + 4) * (x**2 - 2 * x)),
            -2 * sp.log(x)
            + sp.log(x - 2)
            + sp.Rational(1, 2) * sp.log(x**2 + 4)
            - sp.atan(x / 2),
            3.3,
        ),
        (
            "jc935-4-4-10",
            x,
            1 / (x**4 - 16),
            sp.Rational(1, 32) * sp.log((x - 2) / (x + 2))
            - sp.Rational(1, 16) * sp.atan(x / 2),
            3.5,
        ),
        (
            "jc935-4-4-11",
            x,
            1 / ((x**2 + 1) * (x**2 - x + 1)),
            sp.Rational(1, 2) * sp.log(x**2 + 1)
            - sp.Rational(1, 2) * sp.log(x**2 - x + 1)
            + sp.atan((2 * x - 1) / sp.sqrt(3)) / sp.sqrt(3),
            1.4,
        ),
        (
            "jc935-4-4-12",
            x,
            (x - 2) ** 2 / (x**2 + 4) ** 2,
            sp.Rational(1, 2) * sp.atan(x / 2) + 2 / (x**2 + 4),
            1.1,
        ),
        (
            "jc935-4-4-13",
            x,
            (x**2 + 2) / (x**2 + 2 * x + 2) ** 2,
            2 * sp.atan(x + 1) + (x + 2) / (x**2 + 2 * x + 2),
            0.9,
        ),
        (
            "jc935-4-4-14",
            x,
            1 / (4 + sp.cos(x) ** 2),
            sp.atan(2 * sp.tan(x) / sp.sqrt(5)) / (2 * sp.sqrt(5)),
            0.6,
        ),
        (
            "jc935-4-4-15",
            x,
            1 / (5 + 3 * sp.cos(x)),
            sp.Rational(1, 2) * sp.atan(sp.tan(x / 2) / 2),
            0.7,
        ),
        (
            "jc935-4-4-16",
            x,
            1 / (5 + 4 * sp.sin(x)),
            sp.Rational(2, 3) * sp.atan((5 * sp.tan(x / 2) + 4) / 3),
            0.7,
        ),
        (
            "jc935-4-4-17",
            x,
            1 / (1 - sp.sin(x) + sp.cos(x)),
            -sp.log(1 - sp.tan(x / 2)),
            0.4,
        ),
        (
            "jc935-4-4-18",
            x,
            1 / (2 * sp.sin(x) + 2 * sp.cos(x) + 3),
            2 * sp.atan(sp.tan(x / 2) + 2),
            0.6,
        ),
        (
            "jc935-4-4-19",
            x_gt2,
            1 / (2 + (x_gt2 - 1) ** sp.Rational(1, 3)),
            sp.Rational(3, 2) * (x_gt2 - 1) ** sp.Rational(2, 3)
            - 6 * (x_gt2 - 1) ** sp.Rational(1, 3)
            + 12 * sp.log((x_gt2 - 1) ** sp.Rational(1, 3) + 2),
            3.5,
        ),
        (
            "jc935-4-4-20",
            xp,
            (xp ** sp.Rational(3, 2) + 1) / (sp.sqrt(xp) - 1),
            sp.Rational(1, 2) * xp**2
            + sp.Rational(2, 3) * xp * sp.sqrt(xp)
            + xp
            + 4 * sp.sqrt(xp)
            + 4 * sp.log(sp.sqrt(xp) - 1),
            4.5,
        ),
        (
            "jc935-4-4-21",
            xp,
            (sp.sqrt(2 * xp + 1) - 1) / (sp.sqrt(2 * xp + 1) + 1),
            xp - 2 * sp.sqrt(2 * xp + 1) + 2 * sp.log(sp.sqrt(2 * xp + 1) + 1),
            1.7,
        ),
        (
            "jc935-4-4-22",
            xp,
            1 / (sp.sqrt(xp) + 2 * xp ** sp.Rational(1, 4)),
            2 * sp.sqrt(xp)
            - 8 * xp ** sp.Rational(1, 4)
            + 16 * sp.log(xp ** sp.Rational(1, 4) + 2),
            2.5,
        ),
        (
            "jc935-4-4-23",
            x_unit,
            sp.sqrt((1 + x_unit) / (1 - x_unit)) / x_unit,
            sp.log(
                (sp.sqrt(1 + x_unit) - sp.sqrt(1 - x_unit))
                / (sp.sqrt(1 + x_unit) + sp.sqrt(1 - x_unit))
            )
            + 2 * sp.atan(sp.sqrt((1 + x_unit) / (1 - x_unit))),
            0.4,
            p / (1 + p),
        ),
        (
            "jc935-4-4-24",
            x_gt2,
            1 / ((x_gt2 + 2) ** sp.Rational(2, 3) * (x_gt2 - 2) ** sp.Rational(4, 3)),
            -sp.Rational(3, 4) * ((x_gt2 + 2) / (x_gt2 - 2)) ** sp.Rational(1, 3),
            4.5,
            2 + p,
        ),
    ]

    for row in checks:
        if len(row) == 5:
            item_id, var, integrand, antideriv, pt = row
            check_antiderivative(item_id, var, integrand, antideriv, pt)
        else:
            item_id, var, integrand, antideriv, pt, dom_sub = row
            check_antiderivative(item_id, var, integrand, antideriv, pt, dom_sub)

    print(f"All {len(checks)} symbolic antiderivative checks PASSED (4-3: 24, 4-4: 24).")


if __name__ == "__main__":
    main()
