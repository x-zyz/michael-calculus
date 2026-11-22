"""Symbolic verification for bankImproperAndCh5Review (Sections 5-4, 5-5, 5-review)."""

import sympy as sp

x, t, u, a, b, k, p, q, r, alpha, beta = sp.symbols(
    "x t u a b k p q r alpha beta", real=True
)
a_pos, b_pos, k_pos, r_pos, alpha_pos, beta_pos = sp.symbols(
    "a_pos b_pos k_pos r_pos alpha_pos beta_pos", positive=True
)


def check_eq(label: str, lhs, rhs):
    diff = sp.simplify(lhs - rhs)
    assert diff == 0, f"[{label}] Mismatch: lhs={lhs}, rhs={rhs}, diff={diff}"
    print(f"OK  {label}")


def main():
    # --- Section 5-4 ---
    # 5-4-1-1
    check_eq("5-4-1-1", sp.integrate(1 / x**5, (x, 2, sp.oo)), sp.Rational(1, 64))
    # 5-4-1-2
    assert sp.integrate(x ** (-sp.Rational(1, 3)), (x, 4, sp.oo)) == sp.oo
    print("OK  5-4-1-2")
    # 5-4-1-3
    check_eq(
        "5-4-1-3",
        sp.integrate(sp.exp(-k_pos * x), (x, 1, sp.oo)),
        sp.exp(-k_pos) / k_pos,
    )
    # 5-4-1-4
    F_5_4_1_4 = sp.Rational(1, 16) * sp.log((x + 2) ** 2 / (x**2 + 4)) + sp.Rational(
        1, 8
    ) * sp.atan(x / 2)
    check_eq("5-4-1-4-deriv", sp.diff(F_5_4_1_4, x), 1 / ((2 + x) * (4 + x**2)))
    check_eq(
        "5-4-1-4",
        sp.limit(F_5_4_1_4, x, sp.oo) - F_5_4_1_4.subs(x, 0),
        sp.pi / 16,
    )
    # 5-4-1-5
    check_eq(
        "5-4-1-5",
        sp.integrate(sp.exp(-alpha_pos * t) * sp.cos(beta_pos * t), (t, 0, sp.oo)),
        alpha_pos / (alpha_pos**2 + beta_pos**2),
    )
    # 5-4-1-6
    check_eq(
        "5-4-1-6",
        sp.integrate(1 / (x**2 - 4 * x + 8), (x, -sp.oo, sp.oo)),
        sp.pi / 2,
    )
    # 5-4-1-7
    check_eq("5-4-1-7", sp.integrate(x / sp.sqrt(4 - x**2), (x, 0, 2)), 2)
    # 5-4-1-8
    assert sp.integrate(1 / (x - 2) ** 2, (x, 0, 2)) == sp.oo
    print("OK  5-4-1-8")
    # 5-4-1-9
    check_eq(
        "5-4-1-9",
        sp.integrate(x / sp.sqrt(x - 2), (x, 2, 3)),
        sp.Rational(14, 3),
    )
    # 5-4-1-10
    F_5_4_1_10 = sp.asin(sp.log(x) / 2)
    check_eq(
        "5-4-1-10-deriv",
        sp.diff(F_5_4_1_10, x),
        1 / (x * sp.sqrt(4 - sp.log(x) ** 2)),
    )
    check_eq(
        "5-4-1-10",
        sp.limit(F_5_4_1_10, x, sp.E**2, dir="-") - F_5_4_1_10.subs(x, 1),
        sp.pi / 2,
    )
    # 5-4-2
    check_eq(
        "5-4-2",
        sp.integrate(1 / (9 * x**2 - 1), (x, 1, sp.oo)),
        sp.log(2) / 6,
    )
    # 5-4-3
    k_gt1 = sp.Symbol("k_gt1", positive=True)
    # Substitute k = 1 + k_gt1 so k > 1
    val_5_4_3 = sp.integrate(
        1 / (x * sp.log(x) ** (1 + k_gt1)), (x, sp.sqrt(sp.E), sp.oo)
    )
    check_eq("5-4-3-val", val_5_4_3, 2**k_gt1 / k_gt1)
    g = 2 ** (k - 1) / (k - 1)
    k_star = 1 + 1 / sp.log(2)
    check_eq("5-4-3-min-crit", sp.diff(g, k).subs(k, k_star), 0)
    check_eq("5-4-3-min-val", g.subs(k, k_star), sp.E * sp.log(2))
    # 5-4-4
    for n_val in range(5):
        check_eq(
            f"5-4-4-n{n_val}",
            sp.integrate(x**n_val * sp.exp(-2 * x), (x, 0, sp.oo)),
            sp.factorial(n_val) / 2 ** (n_val + 1),
        )
    # 5-4-5
    check_eq("5-4-5", sp.integrate(sp.log(x), (x, 0, 2)), 2 * sp.log(2) - 2)

    # --- Section 5-5 ---
    # 5-5-1-1 to 5-5-1-8: verify key limit comparisons symbolically
    check_eq(
        "5-5-1-1-lim",
        sp.limit(x**2 * x**3 / (x**5 + 2 * x**2 + 3), x, sp.oo),
        1,
    )
    check_eq(
        "5-5-1-2-lim",
        sp.limit(x ** sp.Rational(7, 4) / (x * (x**3 + 2) ** sp.Rational(1, 4)), x, sp.oo),
        1,
    )
    check_eq(
        "5-5-1-3-lim",
        sp.limit(x**2 * sp.tan(1 / x**2), x, sp.oo),
        1,
    )
    assert sp.integrate(1 / (2 + x), (x, 0, sp.oo)) == sp.oo
    print("OK  5-5-1-4-div")
    check_eq(
        "5-5-1-5-lim",
        sp.limit(x**2 * x**2 * sp.atan(x) / (1 + x**4), x, sp.oo),
        sp.pi / 2,
    )
    assert sp.limit((x - 1) / sp.log(x) ** 2, x, 1, dir="+") == sp.oo
    print("OK  5-5-1-6-lim")
    check_eq(
        "5-5-1-7-lim",
        sp.limit(sp.sqrt(1 - x) * x**3 / sp.sqrt(1 - x**3), x, 1, dir="-"),
        1 / sp.sqrt(3),
    )
    check_eq(
        "5-5-1-8-lim2",
        sp.limit(
            (x - 2) ** sp.Rational(1, 3) / sp.real_root(x**2 - 5 * x + 6, 3),
            x,
            2,
            dir="+",
        ),
        -1,
    )
    check_eq(
        "5-5-1-8-lim3",
        sp.limit(
            (3 - x) ** sp.Rational(1, 3) / sp.real_root(x**2 - 5 * x + 6, 3),
            x,
            3,
            dir="-",
        ),
        -1,
    )
    # 5-5-3-1
    for a_v, r_v in [(2, 3), (3, 2)]:
        check_eq(
            f"5-5-3-1-{a_v}-{r_v}",
            sp.integrate(sp.exp(-a_v * x**r_v), (x, 0, sp.oo)),
            sp.gamma(sp.Rational(1, r_v)) / (r_v * sp.Rational(a_v) ** sp.Rational(1, r_v)),
        )
    # 5-5-3-2
    for k_v, p_v in [(1, 2), (2, 3)]:
        check_eq(
            f"5-5-3-2-{k_v}-{p_v}",
            sp.integrate(x**k_v * (-sp.log(x)) ** p_v, (x, 0, 1)),
            sp.gamma(p_v + 1) / (k_v + 1) ** (p_v + 1),
        )
    check_eq(
        "5-5-3-2-sub-half",
        sp.integrate(t ** sp.Rational(1, 2) * sp.exp(-3 * t), (t, 0, sp.oo)),
        sp.gamma(sp.Rational(3, 2)) / 3 ** sp.Rational(3, 2),
    )
    # 5-5-3-3
    for al_v, be_v in [(1, 2), (2, 3), (-3, -2)]:
        check_eq(
            f"5-5-3-3-{al_v}-{be_v}",
            sp.integrate(x**al_v * sp.exp(-2 * x**be_v), (x, 0, sp.oo)),
            sp.gamma(sp.Rational(al_v + 1, be_v))
            / (abs(be_v) * sp.Integer(2) ** sp.Rational(al_v + 1, be_v)),
        )
    # 5-5-4
    for kv in range(1, 6):
        odd_prod = sp.prod(2 * j + 1 for j in range(kv + 1))
        check_eq(
            f"5-5-4-k{kv}",
            sp.gamma(kv + sp.Rational(3, 2)),
            odd_prod * sp.sqrt(sp.pi) / 2 ** (kv + 1),
        )
    # 5-5-5-1, 5-5-5-2, 5-5-5-3
    for nv in range(1, 6):
        check_eq(
            f"5-5-5-1-n{nv}",
            sp.prod(3 * j for j in range(1, nv + 1)),
            3**nv * sp.gamma(nv + 1),
        )
        check_eq(
            f"5-5-5-2-n{nv}",
            sp.prod(2 * j + 1 for j in range(nv + 1)),
            sp.gamma(2 * nv + 2) / (2**nv * sp.gamma(nv + 1)),
        )
        check_eq(
            f"5-5-5-3-n{nv}",
            sp.sqrt(sp.pi) * sp.gamma(2 * nv + 1),
            2 ** (2 * nv) * sp.gamma(nv + 1) * sp.gamma(nv + sp.Rational(1, 2)),
        )

    # --- Section 5-review ---
    # 5-review-1-5: test with f(s) = sin(s) + s**2
    f_test = lambda s: sp.sin(s) + s**2
    expr_1_5 = sp.diff(sp.integrate(t**2 * f_test(t**3 - x**3), (t, 0, x)), x)
    check_eq("5-review-1-5", expr_1_5, x**2 * f_test(-(x**3)))
    # 5-review-2-1
    val_2_1 = sp.integrate(x**3 / sp.sqrt(4 + x), (x, 0, 1)).evalf()
    assert sp.sqrt(5).evalf() / 20 <= val_2_1 <= sp.Rational(1, 8).evalf()
    print("OK  5-review-2-1")
    # 5-review-4-1
    check_eq("5-review-4-1", sp.integrate(sp.sqrt(1 + 3 * x), (x, 0, 1)), sp.Rational(14, 9))
    # 5-review-4-2
    check_eq(
        "5-review-4-2",
        sp.Rational(1, 2) * sp.integrate(x**k_pos, (x, 0, 2)),
        2**k_pos / (k_pos + 1),
    )
    # 5-review-5-1: test with f(t) = cos(t) + t
    f_5_1 = lambda s: sp.cos(s) + s
    check_eq(
        "5-review-5-1",
        sp.limit(x**2 / (x - b) * sp.integrate(f_5_1(t), (t, b, x)), x, b),
        b**2 * f_5_1(b),
    )
    # 5-review-5-2
    check_eq(
        "5-review-5-2",
        sp.limit(sp.atan(x) ** 3 / (x / sp.sqrt(x**2 + 4)), x, sp.oo),
        sp.pi**3 / 8,
    )
    # 5-review-6-1
    check_eq("5-review-6-1", sp.integrate(1 / (4 + x**2), (x, -2, 2)), sp.pi / 4)
    # 5-review-6-2
    check_eq(
        "5-review-6-2",
        sp.integrate(1 / (x**2 - x + 1), (x, -1, 1)),
        sp.pi / sp.sqrt(3),
    )
    # 5-review-7
    expr_7 = sp.integrate(1 / (4 + t**2), (t, 0, a_pos)) + sp.integrate(
        1 / (4 + t**2), (t, 0, 4 / a_pos)
    )
    check_eq("5-review-7-deriv", sp.diff(expr_7, a_pos), 0)
    check_eq("5-review-7-val", expr_7.subs(a_pos, 2), sp.pi / 4)
    # 5-review-11-1: verify via antiderivative
    F_11_1 = 2 * x * sp.tan(x / 2) + 4 * sp.log(sp.cos(x / 2)) - sp.log(1 + sp.cos(x))
    check_eq(
        "5-review-11-1-deriv",
        sp.trigsimp(sp.diff(F_11_1, x) - (2 * x + sp.sin(x)) / (1 + sp.cos(x))),
        0,
    )
    check_eq(
        "5-review-11-1",
        F_11_1.subs(x, sp.pi / 2) - F_11_1.subs(x, 0),
        sp.pi - sp.log(2),
    )
    # 5-review-11-2: verify trig identity + 25-digit mpmath quadrature
    import mpmath as mp

    mp.mp.dps = 30
    check_eq(
        "5-review-11-2-id",
        sp.expand_trig(1 + sp.tan(sp.pi / 4 - u)) - 2 / (1 + sp.tan(u)),
        0,
    )
    val_11_2 = mp.quad(lambda s: mp.log(1 + s) / (1 + s**2), [0, 1])
    assert abs(val_11_2 - mp.pi * mp.log(2) / 8) < mp.mpf("1e-25")
    print("OK  5-review-11-2")
    # 5-review-11-3: verify trig sub + 25-digit quadrature
    val_11_3 = mp.quad(lambda s: 1 / (s + mp.sqrt(9 - s**2)), [0, 3])
    assert abs(val_11_3 - mp.pi / 4) < mp.mpf("1e-25")
    print("OK  5-review-11-3")
    # 5-review-11-4
    check_eq(
        "5-review-11-4",
        sp.sqrt(2)
        * (
            sp.integrate(sp.cos(x), (x, 0, sp.pi / 2))
            - sp.integrate(sp.cos(x), (x, sp.pi / 2, sp.pi))
        ),
        2 * sp.sqrt(2),
    )
    # 5-review-11-5: verify via antiderivative
    F_11_5 = sp.Rational(1, 2) * sp.atan(sp.tan(x) / 2)
    check_eq(
        "5-review-11-5-deriv",
        sp.trigsimp(sp.diff(F_11_5, x) - 1 / (1 + 3 * sp.cos(x) ** 2)),
        0,
    )
    check_eq(
        "5-review-11-5",
        sp.limit(F_11_5, x, sp.pi / 2, dir="-") - F_11_5.subs(x, 0),
        sp.pi / 4,
    )
    # 5-review-11-6
    val_11_6 = mp.quad(
        lambda s: s * mp.sqrt(4 * mp.sin(s) ** 2 - 4 * mp.sin(s) ** 4),
        [0, mp.pi / 2, mp.pi],
    )
    assert abs(val_11_6 - mp.pi) < mp.mpf("1e-25")
    check_eq(
        "5-review-11-6-sym",
        2 * sp.pi * sp.integrate(sp.sin(x) * sp.cos(x), (x, 0, sp.pi / 2)),
        sp.pi,
    )
    # 5-review-11-7
    check_eq(
        "5-review-11-7",
        2 * sp.integrate(x**2 * sp.sin(x), (x, 0, sp.pi / 2)),
        2 * sp.pi - 4,
    )
    # 5-review-11-8: verify via antiderivative
    F_11_8 = sp.exp(-3) * sp.atan(sp.exp(x - 1))
    check_eq(
        "5-review-11-8-deriv",
        sp.diff(F_11_8, x),
        1 / (sp.exp(x + 2) + sp.exp(4 - x)),
    )
    check_eq(
        "5-review-11-8",
        sp.limit(F_11_8, x, sp.oo) - F_11_8.subs(x, 0),
        (sp.pi / 2 - sp.atan(1 / sp.E)) / sp.E**3,
    )
    # 5-review-11-9: verify via antiderivatives on [1,2] and [2,4]
    F_11_9_L = sp.asin(x - 1)
    F_11_9_R = sp.log(x - 1 + sp.sqrt(x**2 - 2 * x))
    check_eq(
        "5-review-11-9-L-deriv",
        sp.diff(F_11_9_L, x),
        1 / sp.sqrt(2 * x - x**2),
    )
    check_eq(
        "5-review-11-9-R-deriv",
        sp.diff(F_11_9_R, x),
        1 / sp.sqrt(x**2 - 2 * x),
    )
    check_eq(
        "5-review-11-9",
        (F_11_9_L.subs(x, 2) - F_11_9_L.subs(x, 1))
        + (F_11_9_R.subs(x, 4) - F_11_9_R.subs(x, 2)),
        sp.pi / 2 + sp.log(3 + 2 * sp.sqrt(2)),
    )
    # 5-review-11-10
    check_eq(
        "5-review-11-10-neg",
        sp.integrate(1, (t, 0, -1)) + sp.integrate(t**2, (t, -1, x)),
        x**3 / 3 - sp.Rational(2, 3),
    )
    check_eq(
        "5-review-11-10-pos",
        sp.integrate(1, (t, 0, 1)) + sp.integrate(t**2, (t, 1, x)),
        x**3 / 3 + sp.Rational(2, 3),
    )
    # 5-review-14
    val_14 = sp.integrate(1 / (1 + sp.exp(u)), (u, -1, 0)) + sp.integrate(
        1 / (1 + 2 * u), (u, 0, 1)
    )
    check_eq(
        "5-review-14",
        val_14,
        sp.log((1 + sp.E) / 2) + sp.log(3) / 2,
    )
    # 5-review-17
    for nv in range(5):
        check_eq(
            f"5-review-17-n{nv}",
            sp.integrate(x ** (2 * nv + 1) * sp.exp(-2 * x**2), (x, 0, sp.oo)),
            sp.gamma(nv + 1) / 2 ** (nv + 2),
        )
    # 5-review-18-1..4 limits
    check_eq(
        "5-review-18-1-lim0",
        sp.limit(sp.sqrt(x) * sp.sin(2 * x) / x ** sp.Rational(3, 2), x, 0, dir="+"),
        2,
    )
    check_eq(
        "5-review-18-2-lim3",
        sp.limit(
            (x - 3) ** sp.Rational(1, 3) / (x * (x**2 - 5 * x + 6) ** sp.Rational(1, 3)),
            x,
            3,
            dir="+",
        ),
        sp.Rational(1, 3),
    )
    check_eq(
        "5-review-18-2-limoo",
        sp.limit(
            x ** sp.Rational(5, 3) / (x * (x**2 - 5 * x + 6) ** sp.Rational(1, 3)),
            x,
            sp.oo,
        ),
        1,
    )
    check_eq(
        "5-review-18-3-bound",
        sp.integrate(1 / (x * sp.log(x) ** 2), (x, 3, sp.oo)),
        1 / sp.log(3),
    )
    check_eq(
        "5-review-18-4-limoo",
        sp.limit(
            x ** sp.Rational(4, 3) / sp.real_root(x**2 * (x - 2) * (x - 3), 3),
            x,
            sp.oo,
        ),
        1,
    )
    # 5-review-19-1: verify symmetry + 25-digit quadrature
    val_19_1 = mp.quad(lambda s: mp.log(mp.cos(s)), [0, mp.pi / 2])
    assert abs(val_19_1 - (-mp.pi * mp.log(2) / 2)) < mp.mpf("1e-24")
    print("OK  5-review-19-1")
    # 5-review-19-2: verify x=4/t algebraic identity + 25-digit quadrature for beta=0,1,2,3
    f_19_2 = lambda s, be: 1 / ((4 + s**2) * (1 + (s / 2) ** be))
    check_eq(
        "5-review-19-2-id",
        f_19_2(a_pos, beta) + f_19_2(4 / a_pos, beta) * (4 / a_pos**2),
        1 / (4 + a_pos**2),
    )
    check_eq("5-review-19-2-base", sp.integrate(1 / (4 + x**2), (x, 0, sp.oo)) / 2, sp.pi / 8)
    for bv in [0, 1, 2, 3]:
        val_19_2 = mp.quad(
            lambda s: 1 / ((4 + s**2) * (1 + (s / 2) ** bv)), [0, mp.inf]
        )
        assert abs(val_19_2 - mp.pi / 8) < mp.mpf("1e-24")
        print(f"OK  5-review-19-2-b{bv}")

    print("ALL SYMBOLIC CHECKS PASSED!")


if __name__ == "__main__":
    main()
