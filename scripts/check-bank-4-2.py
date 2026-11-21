"""Symbolic verification for Section 4-2 (Substitution Integration, 58 items).

Verifies:
- Q1 (14 items): differential matching f(x) dx = k d(g(x)) via simplify(k * diff(g, x) - f) == 0
- Q2 (44 items): indefinite integrals via simplify(diff(F, x) - integrand) == 0 on appropriate domains
"""

import sympy as sp


def check_zero(item_id: str, expr: sp.Expr, note: str = "") -> None:
    res = sp.simplify(sp.trigsimp(expr))
    if res != 0:
        res2 = sp.simplify(sp.expand_trig(res))
        if res2 != 0:
            raise AssertionError(f"[{item_id}] verification failed ({note}): residual = {res2}")


def main() -> None:
    x = sp.Symbol("x", real=True)
    t = sp.Symbol("t", real=True)
    x_pos = sp.Symbol("x", positive=True)
    t_pos = sp.Symbol("t", positive=True)
    m, p, q, omega, theta = sp.symbols("m p q omega theta", real=True, nonzero=True)
    a_pos = sp.Symbol("a", positive=True)

    verified = 0

    # --- Question 1: Differential matching f(x) dx = k d(g(x)) (14 items) ---
    q1_cases = [
        ("jc935-4-2-1-1", t, sp.Integer(1), 1 / m, m * t),
        ("jc935-4-2-1-2", x, sp.Integer(1), sp.Rational(1, 4), 4 * x + 9),
        ("jc935-4-2-1-3", x, x**2, sp.Rational(1, 3), x**3),
        ("jc935-4-2-1-4", x, x, sp.Rational(1, 6), 3 * x**2),
        ("jc935-4-2-1-5", x, x, -sp.Rational(1, 6), 4 - 3 * x**2),
        ("jc935-4-2-1-6", x, x**2, sp.Rational(1, 6), 2 * x**3 + 5),
        ("jc935-4-2-1-7", x, sp.exp(3 * x), sp.Rational(1, 3), sp.exp(3 * x)),
        ("jc935-4-2-1-8", x, sp.exp(-x / 3), sp.Integer(-3), 2 + sp.exp(-x / 3)),
        ("jc935-4-2-1-9", x, sp.sin(sp.Rational(2, 3) * x), -sp.Rational(3, 2), sp.cos(sp.Rational(2, 3) * x)),
        ("jc935-4-2-1-10", x_pos, 1 / x_pos, sp.Rational(1, 4), 4 * sp.log(x_pos)),
        ("jc935-4-2-1-11", x_pos, 1 / x_pos, -sp.Rational(1, 3), 7 - 3 * sp.log(x_pos)),
        ("jc935-4-2-1-12", x, 1 / (1 + 4 * x**2), sp.Rational(1, 2), sp.atan(2 * x)),
        ("jc935-4-2-1-13", x, 1 / sp.sqrt(1 - x**2), -sp.Rational(1, 2), 5 - 2 * sp.asin(x)),
        ("jc935-4-2-1-14", x, x / sp.sqrt(9 - 2 * x**2), -sp.Rational(1, 2), sp.sqrt(9 - 2 * x**2)),
    ]

    for item_id, var, f_expr, k_expr, g_expr in q1_cases:
        check_zero(item_id, k_expr * sp.diff(g_expr, var) - f_expr)
        # Also verify negative branch for log-abs items
        if item_id in ("jc935-4-2-1-10", "jc935-4-2-1-11"):
            x_neg = sp.Symbol("x", negative=True)
            g_neg = g_expr.subs(x_pos, -x_neg)
            f_neg = 1 / x_neg
            check_zero(item_id, k_expr * sp.diff(g_neg, x_neg) - f_neg, "x < 0 branch")
        verified += 1

    # --- Question 2: Indefinite integrals (44 items) ---
    # 2-1 to 2-10
    check_zero("jc935-4-2-2-1", sp.diff(sp.Rational(1, 3) * sp.exp(3 * t), t) - sp.exp(3 * t))
    verified += 1

    check_zero("jc935-4-2-2-2", sp.diff(-sp.Rational(1, 25) * (2 - 5 * x) ** 5, x) - (2 - 5 * x) ** 4)
    verified += 1

    for sign, label in [(1, "3-4x>0"), (-1, "3-4x<0")]:
        check_zero(
            "jc935-4-2-2-3",
            sp.diff(-sp.Rational(1, 4) * sp.log(sign * (3 - 4 * x)), x) - 1 / (3 - 4 * x),
            label,
        )
    verified += 1

    u_pos = sp.Symbol("u", positive=True)
    # 2-4: (5-2x)^(-1/3)
    check_zero(
        "jc935-4-2-2-4",
        sp.diff(-sp.Rational(3, 4) * (5 - 2 * x) ** sp.Rational(2, 3), x) - (5 - 2 * x) ** (-sp.Rational(1, 3)),
    )
    verified += 1

    check_zero(
        "jc935-4-2-2-5",
        sp.diff(sp.sin(p * x) / p + q * sp.exp(x / q), x) - (sp.cos(p * x) + sp.exp(x / q)),
    )
    verified += 1

    check_zero(
        "jc935-4-2-2-6",
        sp.diff(2 * sp.sin(sp.sqrt(t_pos)), t_pos) - sp.cos(sp.sqrt(t_pos)) / sp.sqrt(t_pos),
    )
    verified += 1

    check_zero(
        "jc935-4-2-2-7",
        sp.diff(-sp.Rational(1, 6) * sp.exp(-3 * x**2), x) - x * sp.exp(-3 * x**2),
    )
    verified += 1

    check_zero(
        "jc935-4-2-2-8",
        sp.diff(-sp.Rational(1, 4) * sp.cos(2 * x**2), x) - x * sp.sin(2 * x**2),
    )
    verified += 1

    check_zero(
        "jc935-4-2-2-9",
        sp.diff(-sp.Rational(1, 2) * sp.sqrt(5 - 2 * x**2), x) - x / sp.sqrt(5 - 2 * x**2),
    )
    verified += 1

    for sign, label in [(1, "2-x^3>0"), (-1, "2-x^3<0")]:
        check_zero(
            "jc935-4-2-2-10",
            sp.diff(-sp.Rational(5, 3) * sp.log(sign * (2 - x**3)), x) - 5 * x**2 / (2 - x**3),
            label,
        )
    verified += 1

    # 2-11 to 2-20
    check_zero(
        "jc935-4-2-2-11",
        sp.diff(sp.Rational(1, 2) * sp.log(x**2 + 4 * x + 7), x) - (x + 2) / (x**2 + 4 * x + 7),
    )
    verified += 1

    check_zero(
        "jc935-4-2-2-12",
        sp.diff(sp.sin(omega * t + theta) ** 4 / (4 * omega), t)
        - sp.sin(omega * t + theta) ** 3 * sp.cos(omega * t + theta),
    )
    verified += 1

    check_zero(
        "jc935-4-2-2-13",
        sp.diff(-1 / (3 * sp.sin(x) ** 3), x) - sp.cos(x) / sp.sin(x) ** 4,
    )
    verified += 1

    check_zero(
        "jc935-4-2-2-14",
        sp.diff(sp.Rational(3, 2) * (sp.sin(x) + sp.cos(x)) ** sp.Rational(2, 3), x)
        - (sp.cos(x) - sp.sin(x)) / (sp.sin(x) + sp.cos(x)) ** sp.Rational(1, 3),
    )
    verified += 1

    check_zero(
        "jc935-4-2-2-15",
        sp.diff(sp.Rational(1, 8) * sp.tan(x) ** 8, x) - sp.tan(x) ** 7 * sp.sec(x) ** 2,
    )
    verified += 1

    # 2-16: ln|ln(ln(2x))| on 2x > e and 1 < 2x < e
    for sign, label in [(1, "ln(ln(2x))>0"), (-1, "ln(ln(2x))<0")]:
        check_zero(
            "jc935-4-2-2-16",
            sp.diff(sp.log(sign * sp.log(sp.log(2 * x_pos))), x_pos)
            - 1 / (x_pos * sp.log(2 * x_pos) * sp.log(sp.log(2 * x_pos))),
            label,
        )
    verified += 1

    check_zero(
        "jc935-4-2-2-17",
        sp.diff(-1 / (2 * sp.asin(x) ** 2), x) - 1 / (sp.asin(x) ** 3 * sp.sqrt(1 - x**2)),
    )
    verified += 1

    check_zero(
        "jc935-4-2-2-18",
        sp.diff(3 ** (2 * sp.asin(x)) / (2 * sp.log(3)), x) - 3 ** (2 * sp.asin(x)) / sp.sqrt(1 - x**2),
    )
    verified += 1

    for sign, label in [(1, "sin>0"), (-1, "sin<0")]:
        check_zero(
            "jc935-4-2-2-19",
            sp.diff(sp.log(sign * sp.sin(sp.sqrt(4 + x**2))), x)
            - sp.cot(sp.sqrt(4 + x**2)) * x / sp.sqrt(4 + x**2),
            label,
        )
    verified += 1

    check_zero(
        "jc935-4-2-2-20",
        sp.diff(sp.Rational(2, 3) * sp.atan(sp.sqrt(x_pos)) ** 3, x_pos)
        - sp.atan(sp.sqrt(x_pos)) ** 2 / (sp.sqrt(x_pos) * (1 + x_pos)),
    )
    verified += 1

    # 2-21 to 2-30
    check_zero(
        "jc935-4-2-2-21",
        sp.diff(-1 / (2 * (x_pos * sp.log(x_pos)) ** 2), x_pos)
        - (1 + sp.log(x_pos)) / (x_pos * sp.log(x_pos)) ** 3,
    )
    verified += 1

    for sign, label in [(1, "tan2x>0"), (-1, "tan2x<0")]:
        check_zero(
            "jc935-4-2-2-22",
            sp.diff(sp.Rational(1, 2) * sp.log(sign * sp.tan(2 * x)), x)
            - 1 / (sp.sin(2 * x) * sp.cos(2 * x)),
            label,
        )
    verified += 1

    check_zero(
        "jc935-4-2-2-23",
        sp.diff(sp.Rational(1, 3) * sp.log(sp.tan(x)) ** 3, x)
        - sp.log(sp.tan(x)) ** 2 / (sp.sin(x) * sp.cos(x)),
    )
    verified += 1

    check_zero(
        "jc935-4-2-2-24",
        sp.diff(-sp.cos(x) + sp.Rational(1, 3) * sp.cos(x) ** 3, x) - sp.sin(x) ** 3,
    )
    verified += 1

    check_zero(
        "jc935-4-2-2-25",
        sp.diff(t / 2 - sp.sin(2 * (omega * t + theta)) / (4 * omega), t)
        - sp.sin(omega * t + theta) ** 2,
    )
    verified += 1

    check_zero(
        "jc935-4-2-2-26",
        sp.diff(-sp.Rational(1, 16) * sp.cos(8 * x) + sp.Rational(1, 4) * sp.cos(2 * x), x)
        - sp.sin(3 * x) * sp.cos(5 * x),
    )
    verified += 1

    check_zero(
        "jc935-4-2-2-27",
        sp.diff(
            sp.Rational(1, 5) * sp.sin(sp.Rational(5, 2) * x)
            + sp.Rational(1, 3) * sp.sin(sp.Rational(3, 2) * x),
            x,
        )
        - sp.cos(2 * x) * sp.cos(x / 2),
    )
    verified += 1

    check_zero(
        "jc935-4-2-2-28",
        sp.diff(sp.Rational(1, 6) * sp.sin(3 * x) - sp.Rational(1, 18) * sp.sin(9 * x), x)
        - sp.sin(3 * x) * sp.sin(6 * x),
    )
    verified += 1

    check_zero(
        "jc935-4-2-2-29",
        sp.diff(-sp.Rational(1, 3) * sp.csc(x) ** 3 + sp.csc(x), x) - sp.cot(x) ** 3 * sp.csc(x),
    )
    verified += 1

    check_zero(
        "jc935-4-2-2-30",
        sp.diff(sp.Rational(1, 2) * sp.atan(sp.exp(2 * x)), x) - 1 / (sp.exp(2 * x) + sp.exp(-2 * x)),
    )
    verified += 1

    # 2-31 to 2-40
    check_zero(
        "jc935-4-2-2-31",
        sp.diff(
            sp.Rational(2, 3) * sp.asin(sp.Rational(3, 4) * x)
            + sp.Rational(1, 9) * sp.sqrt(16 - 9 * x**2),
            x,
        )
        - (2 - x) / sp.sqrt(16 - 9 * x**2),
    )
    verified += 1

    check_zero(
        "jc935-4-2-2-32",
        sp.diff(x**2 / 2 - 2 * sp.log(4 + x**2), x) - x**3 / (4 + x**2),
    )
    verified += 1

    for sign, label in [(1, "frac>0"), (-1, "frac<0")]:
        check_zero(
            "jc935-4-2-2-33",
            sp.diff(
                sp.log(sign * (sp.sqrt(3) * x - 1) / (sp.sqrt(3) * x + 1)) / (2 * sp.sqrt(3)),
                x,
            )
            - 1 / (3 * x**2 - 1),
            label,
        )
    verified += 1

    for sign, label in [(1, "frac>0"), (-1, "frac<0")]:
        check_zero(
            "jc935-4-2-2-34",
            sp.diff(sp.Rational(1, 4) * sp.log(sign * (x - 1) / (x + 3)), x)
            - 1 / ((x - 1) * (x + 3)),
            label,
        )
    verified += 1

    for s1, s2, label in [(1, 1, "x>3"), (-1, 1, "-1<x<3"), (-1, -1, "x<-1")]:
        check_zero(
            "jc935-4-2-2-35",
            sp.diff(
                sp.Rational(3, 4) * sp.log(s1 * (x - 3)) + sp.Rational(1, 4) * sp.log(s2 * (x + 1)),
                x,
            )
            - x / (x**2 - 2 * x - 3),
            label,
        )
    verified += 1

    # 2-36: |x| < 2a -> write x = 2*a*sin(u) or verify directly with sqrt(4a^2-x^2)
    # Using positive symbol for 4a^2 - x^2 via direct algebraic simplification
    F_36 = 2 * a_pos**2 * sp.asin(x / (2 * a_pos)) - x * sp.sqrt(4 * a_pos**2 - x**2) / 2
    diff_36 = sp.simplify(sp.diff(F_36, x) - x**2 / sp.sqrt(4 * a_pos**2 - x**2))
    # Replace sqrt(1 - x^2/(4a^2)) with sqrt(4a^2-x^2)/(2a)
    diff_36 = sp.simplify(diff_36.subs(sp.sqrt(1 - x**2 / (4 * a_pos**2)), sp.sqrt(4 * a_pos**2 - x**2) / (2 * a_pos)))
    check_zero("jc935-4-2-2-36", diff_36)
    verified += 1

    # 2-37: x > 2 and x < -2
    y_gt2 = sp.Symbol("y", positive=True)
    # x = y + 2 > 2
    x_gt2 = y_gt2 + 2
    F_37_pos = -sp.Rational(1, 2) * sp.asin(2 / x_gt2)
    check_zero(
        "jc935-4-2-2-37",
        sp.diff(F_37_pos, y_gt2) - 1 / (x_gt2 * sp.sqrt(x_gt2**2 - 4)),
        "x > 2",
    )
    # x = -(y + 2) < -2, |x| = y + 2
    x_ltm2 = -(y_gt2 + 2)
    F_37_neg = -sp.Rational(1, 2) * sp.asin(2 / (y_gt2 + 2))
    # dF/dx = (dF/dy)/(dx/dy) = -dF/dy
    check_zero(
        "jc935-4-2-2-37",
        -sp.diff(F_37_neg, y_gt2) - 1 / (x_ltm2 * sp.sqrt(x_ltm2**2 - 4)),
        "x < -2",
    )
    verified += 1

    # 2-38
    check_zero(
        "jc935-4-2-2-38",
        sp.diff(x / (4 * sp.sqrt(x**2 + 4)), x) - 1 / (x**2 + 4) ** sp.Rational(3, 2),
    )
    verified += 1

    # 2-39: x > 2 and x < -2
    F_39_pos = sp.sqrt(x_gt2**2 - 4) - 2 * sp.acos(2 / x_gt2)
    check_zero(
        "jc935-4-2-2-39",
        sp.diff(F_39_pos, y_gt2) - sp.sqrt(x_gt2**2 - 4) / x_gt2,
        "x > 2",
    )
    F_39_neg = sp.sqrt(x_ltm2**2 - 4) - 2 * sp.acos(2 / (y_gt2 + 2))
    check_zero(
        "jc935-4-2-2-39",
        -sp.diff(F_39_neg, y_gt2) - sp.sqrt(x_ltm2**2 - 4) / x_ltm2,
        "x < -2",
    )
    verified += 1

    # 2-40
    check_zero(
        "jc935-4-2-2-40",
        sp.diff(
            sp.Rational(2, 3) * sp.sqrt(3 * x_pos) - sp.Rational(4, 3) * sp.log(2 + sp.sqrt(3 * x_pos)),
            x_pos,
        )
        - 1 / (2 + sp.sqrt(3 * x_pos)),
    )
    verified += 1

    # 2-41 to 2-44
    F_41 = sp.asin(x / 2) - x / (2 + sp.sqrt(4 - x**2))
    diff_41 = sp.simplify(
        (sp.diff(F_41, x) - 1 / (2 + sp.sqrt(4 - x**2))).subs(
            sp.sqrt(1 - x**2 / 4), sp.sqrt(4 - x**2) / 2
        )
    )
    check_zero("jc935-4-2-2-41", diff_41)
    verified += 1

    for sign, label in [(1, "x+sqrt(4-x^2)>0"), (-1, "x+sqrt(4-x^2)<0")]:
        F_42 = sp.Rational(1, 2) * (sp.asin(x / 2) + sp.log(sign * (x + sp.sqrt(4 - x**2))))
        diff_42 = sp.simplify(
            (sp.diff(F_42, x) - 1 / (x + sp.sqrt(4 - x**2))).subs(
                sp.sqrt(1 - x**2 / 4), sp.sqrt(4 - x**2) / 2
            )
        )
        check_zero("jc935-4-2-2-42", diff_42, label)
    verified += 1

    check_zero(
        "jc935-4-2-2-43",
        sp.diff(
            sp.Rational(1, 2) * sp.log(x**2 - 4 * x + 7)
            + sp.sqrt(3) * sp.atan((x - 2) / sp.sqrt(3)),
            x,
        )
        - (x + 1) / (x**2 - 4 * x + 7),
    )
    verified += 1

    check_zero(
        "jc935-4-2-2-44",
        sp.diff(
            (x + 4) / (2 * (x**2 + 4))
            + sp.Rational(1, 2) * sp.log(x**2 + 4)
            + sp.Rational(1, 4) * sp.atan(x / 2),
            x,
        )
        - (x**3 + 4) / (x**2 + 4) ** 2,
    )
    verified += 1

    assert verified == 58, f"Expected 58 verified items, got {verified}"
    print(f"ALL {verified} Section 4-2 items symbolically verified successfully!")


if __name__ == "__main__":
    main()
