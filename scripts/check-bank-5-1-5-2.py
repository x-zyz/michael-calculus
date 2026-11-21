#!/usr/bin/env python3
"""Symbolic verification for Chapter 5 sections 5-1 and 5-2 (bankDefiniteIntroFtc)."""

import sympy as sp

x, t, u, y = sp.symbols("x t u y", real=True)
a, b = sp.symbols("a b", real=True)
n, i = sp.symbols("n i", integer=True, positive=True)
m, k = sp.symbols("m k", integer=True, positive=True)
pos_t, pos_b = sp.symbols("pos_t pos_b", positive=True)


def check_eq(label: str, lhs, rhs):
    diff = sp.simplify(lhs - rhs)
    assert diff == 0, f"{label} FAILED: {lhs} != {rhs} (diff={diff})"


def main():
    verified = 0

    # --- Section 5-1 ---
    # 5-1-1: Riemann sum for y = 2x^2 + 3 on [a, b]
    dx = (b - a) / n
    xi = a + i * dx
    rsum_1 = sp.summation((2 * xi**2 + 3) * dx, (i, 1, n))
    lim_1 = sp.limit(rsum_1, n, sp.oo)
    ans_1 = sp.Rational(2, 3) * (b**3 - a**3) + 3 * (b - a)
    check_eq("5-1-1 (limit)", lim_1, ans_1)
    check_eq("5-1-1 (integral)", sp.integrate(2 * x**2 + 3, (x, a, b)), ans_1)
    verified += 1

    # 5-1-2-1: Riemann sum for int_a^b (3x + 1) dx
    rsum_2_1 = sp.summation((3 * xi + 1) * dx, (i, 1, n))
    lim_2_1 = sp.limit(rsum_2_1, n, sp.oo)
    ans_2_1 = sp.Rational(3, 2) * (b**2 - a**2) + (b - a)
    check_eq("5-1-2-1", lim_2_1, ans_2_1)
    verified += 1

    # 5-1-2-2: Riemann sum for int_0^1 e^(2x) dx
    rsum_2_2 = sp.summation(sp.exp(2 * i / n) / n, (i, 1, n))
    lim_2_2 = sp.limit(rsum_2_2, n, sp.oo)
    ans_2_2 = (sp.E**2 - 1) / 2
    check_eq("5-1-2-2", lim_2_2, ans_2_2)
    verified += 1

    # 5-1-3-1..4: Geometric identities
    check_eq("5-1-3-1", sp.integrate(3 * x, (x, 0, 2)), 6)
    verified += 1
    check_eq("5-1-3-2", sp.integrate(sp.sqrt(4 - x**2), (x, 0, 2)), sp.pi)
    verified += 1
    check_eq("5-1-3-3", sp.integrate(sp.sin(2 * x), (x, -sp.pi / 2, sp.pi / 2)), 0)
    verified += 1
    check_eq(
        "5-1-3-4",
        sp.integrate(sp.cos(2 * x), (x, -sp.pi / 4, sp.pi / 4)),
        2 * sp.integrate(sp.cos(2 * x), (x, 0, sp.pi / 4)),
    )
    verified += 1

    # 5-1-4-1..4: Geometric evaluation
    check_eq("5-1-4-1", sp.integrate(4 * x, (x, 0, pos_t)), 2 * pos_t**2)
    verified += 1
    check_eq("5-1-4-2", sp.integrate(x / 3 + 2, (x, -1, 5)), 16)
    verified += 1
    check_eq("5-1-4-3", sp.integrate(sp.Abs(x), (x, -2, 3)), sp.Rational(13, 2))
    verified += 1
    check_eq("5-1-4-4", sp.integrate(sp.sqrt(16 - x**2), (x, -4, 4)), 8 * sp.pi)
    verified += 1

    # 5-1-5: Maximize int_a^b (2x - x^2) dx -> a=0, b=2, max = 4/3
    roots_5 = sp.solve(2 * x - x**2, x)
    assert roots_5 == [0, 2], f"5-1-5 roots: {roots_5}"
    check_eq("5-1-5", sp.integrate(2 * x - x**2, (x, 0, 2)), sp.Rational(4, 3))
    verified += 1

    # 5-1-6: int_1^{e^2} ln x dx + int_0^2 e^x dx = 2 e^2
    lhs_6 = sp.integrate(sp.log(x), (x, 1, sp.E**2)) + sp.integrate(sp.exp(x), (x, 0, 2))
    check_eq("5-1-6", lhs_6, 2 * sp.E**2)
    verified += 1

    # 5-1-7: Simpson's rule for ln 3 = int_0^2 1/(1+x) dx with n=4
    check_eq("5-1-7 (exact)", sp.integrate(1 / (1 + x), (x, 0, 2)), sp.log(3))
    h = sp.Rational(1, 2)
    f_vals = [1 / (1 + j * h) for j in range(5)]
    simp_7 = (h / 3) * (f_vals[0] + f_vals[4] + 4 * (f_vals[1] + f_vals[3]) + 2 * f_vals[2])
    check_eq("5-1-7 (simpson)", simp_7, sp.Rational(11, 10))
    assert abs(float(simp_7) - float(sp.log(3))) < 0.002
    verified += 1

    # 5-1-8-1..4: Linearity & interval additivity
    # int_0^2 4f = 20 => int_0^2 f = 5; int_0^5 f = 7; int_0^5 g = -4
    I_f_02 = sp.Rational(20, 4)
    I_f_05 = sp.Integer(7)
    I_g_05 = sp.Integer(-4)
    check_eq("5-1-8-1", I_f_02, 5)
    verified += 1
    check_eq("5-1-8-2", I_f_05 - I_f_02, 2)
    verified += 1
    check_eq("5-1-8-3", -I_g_05, 4)
    verified += 1
    check_eq("5-1-8-4", sp.Rational(1, 3) * (2 * I_f_05 - I_g_05), 6)
    verified += 1

    # 5-1-10-1..4: Bounds estimation
    val_10_1 = sp.integrate(x**2 + 2, (x, 2, 5))
    assert 18 <= val_10_1 <= 81
    check_eq("5-1-10-1 (bounds)", (5 - 2) * (2**2 + 2), 18)
    check_eq("5-1-10-1 (upper)", (5 - 2) * (5**2 + 2), 81)
    verified += 1

    val_10_2 = sp.integrate(2 + sp.cos(x) ** 2, (x, sp.pi / 6, 7 * sp.pi / 6))
    assert 2 * sp.pi <= val_10_2 <= 3 * sp.pi
    verified += 1

    # 5-1-10-3: int_1^{sqrt(3)} x arctan x dx
    f10_3 = x * sp.atan(x)
    min_10_3 = f10_3.subs(x, 1)
    max_10_3 = f10_3.subs(x, sp.sqrt(3))
    len_10_3 = sp.sqrt(3) - 1
    low_10_3 = sp.simplify(min_10_3 * len_10_3)
    high_10_3 = sp.simplify(max_10_3 * len_10_3)
    check_eq("5-1-10-3 (low)", low_10_3, (sp.sqrt(3) - 1) * sp.pi / 4)
    check_eq("5-1-10-3 (high)", high_10_3, (3 - sp.sqrt(3)) * sp.pi / 3)
    val_10_3 = float(sp.N(sp.integrate(f10_3, (x, 1, sp.sqrt(3)))))
    assert float(low_10_3) < val_10_3 < float(high_10_3)
    verified += 1

    # 5-1-10-4: int_3^0 e^(x^2 - 2x) dx
    poly_10_4 = x**2 - 2 * x
    crit_10_4 = sp.solve(sp.diff(poly_10_4, x), x)
    assert crit_10_4 == [1]
    assert poly_10_4.subs(x, 1) == -1
    assert poly_10_4.subs(x, 3) == 3
    val_10_4 = float(sp.N(sp.integrate(sp.exp(poly_10_4), (x, 3, 0))))
    assert float(-3 * sp.E**3) < val_10_4 < float(-3 * sp.E ** (-1))
    verified += 1

    # 5-1-13-1..5: Comparisons
    assert sp.integrate(x**3, (x, 0, 1)) > sp.integrate(x**4, (x, 0, 1))
    verified += 1
    assert sp.integrate(x**4, (x, 1, 3)) > sp.integrate(x**3, (x, 1, 3))
    verified += 1
    assert sp.integrate(sp.log(x) ** 2, (x, 1, sp.E)) > sp.integrate(sp.log(x) ** 3, (x, 1, sp.E))
    verified += 1
    assert sp.integrate(2 * x, (x, 0, 1)) > sp.integrate(sp.log(1 + 2 * x), (x, 0, 1))
    verified += 1
    assert sp.integrate(sp.exp(2 * x), (x, 0, 1)) > sp.integrate(1 + 2 * x, (x, 0, 1))
    verified += 1

    # --- Section 5-2 ---
    # 5-2-1: y = int_0^x cos t dt
    y1 = sp.integrate(sp.cos(t), (t, 0, x))
    dy1 = sp.diff(y1, x)
    check_eq("5-2-1 (0)", dy1.subs(x, 0), 1)
    check_eq("5-2-1 (pi/6)", dy1.subs(x, sp.pi / 6), sp.sqrt(3) / 2)
    verified += 1

    # 5-2-2: x = int_0^t cos u du, y = int_0^t 2 sin u du
    dx_dt = sp.diff(sp.integrate(sp.cos(u), (u, 0, t)), t)
    dy_dt = sp.diff(sp.integrate(2 * sp.sin(u), (u, 0, t)), t)
    check_eq("5-2-2", dy_dt / dx_dt, 2 * sp.tan(t))
    verified += 1

    # 5-2-3: int_0^y e^(2t) dt + int_0^x sin t dt = 0
    F_imp = sp.integrate(sp.exp(2 * t), (t, 0, y)) + sp.integrate(sp.sin(t), (t, 0, x))
    dydx_3 = -sp.diff(F_imp, x) / sp.diff(F_imp, y)
    check_eq("5-2-3", dydx_3, -sp.exp(-2 * y) * sp.sin(x))
    verified += 1

    # 5-2-4: I(x) = int_0^x (t - 1) e^(-t^2) dt
    I_prime = (x - 1) * sp.exp(-(x**2))
    assert sp.solve(I_prime, x) == [1]
    assert I_prime.subs(x, 0) < 0 and I_prime.subs(x, 2) > 0
    verified += 1

    # 5-2-5-1..3: Leibniz rule derivatives
    # 5-2-5-1: d/dx int_0^{x^3} sqrt(1+t^2) dt
    expr_5_1 = sp.Integral(sp.sqrt(1 + t**2), (t, 0, x**3))
    check_eq("5-2-5-1", sp.diff(expr_5_1, x), 3 * x**2 * sp.sqrt(1 + x**6))
    verified += 1

    # 5-2-5-2: d/dx int_x^{x^2} 1/sqrt(4+t^4) dt
    expr_5_2 = sp.Integral(1 / sp.sqrt(4 + t**4), (t, x, x**2))
    check_eq(
        "5-2-5-2",
        sp.diff(expr_5_2, x),
        2 * x / sp.sqrt(4 + x**8) - 1 / sp.sqrt(4 + x**4),
    )
    verified += 1

    # 5-2-5-3: d/dx int_{cos x}^{sin x} sin(pi t^2) dt
    expr_5_3 = sp.Integral(sp.sin(sp.pi * t**2), (t, sp.cos(x), sp.sin(x)))
    deriv_5_3 = sp.diff(expr_5_3, x)
    target_5_3 = (sp.cos(x) + sp.sin(x)) * sp.sin(sp.pi * sp.sin(x) ** 2)
    check_eq("5-2-5-3", sp.trigsimp(deriv_5_3 - target_5_3), 0)
    verified += 1

    # 5-2-6: f(x) = int_2^x sqrt(8 + t^3) dt, (f^{-1})'(0) = 1/4
    f6_prime = sp.sqrt(8 + x**3)
    check_eq("5-2-6", 1 / f6_prime.subs(x, 2), sp.Rational(1, 4))
    verified += 1

    # 5-2-7: f(x) = int_0^x [int_{cos t}^1 sqrt(3 + 4 u^2) du] dt, f''(pi/3) = sqrt(3)
    f7_prime = sp.Integral(sp.sqrt(3 + 4 * u**2), (u, sp.cos(x), 1))
    f7_dprime = sp.diff(f7_prime, x)
    check_eq("5-2-7", f7_dprime.subs(x, sp.pi / 3), sp.sqrt(3))
    verified += 1

    # 5-2-9-1..12: Definite integrals
    check_eq("5-2-9-1", sp.integrate(4 * x**3 - 2 * x + 3, (x, 0, a)), a**4 - a**2 + 3 * a)
    verified += 1
    check_eq("5-2-9-2", sp.integrate(x**3 + x ** (-3), (x, 1, 2)), sp.Rational(33, 8))
    verified += 1
    check_eq("5-2-9-3", sp.integrate(sp.sqrt(x) * (2 + sp.sqrt(x)), (x, 1, 4)), sp.Rational(101, 6))
    verified += 1
    check_eq("5-2-9-4", sp.integrate(1 / (1 + x**2), (x, 1, sp.sqrt(3))), sp.pi / 12)
    verified += 1
    check_eq(
        "5-2-9-5",
        sp.integrate(1 / sp.sqrt(1 - x**2), (x, -sp.sqrt(3) / 2, sp.sqrt(3) / 2)),
        2 * sp.pi / 3,
    )
    verified += 1
    check_eq("5-2-9-6", sp.integrate(1 / (pos_b**2 + x**2), (x, 0, pos_b)), sp.pi / (4 * pos_b))
    verified += 1
    check_eq("5-2-9-7", sp.integrate(1 / sp.sqrt(9 - x**2), (x, 0, sp.Rational(3, 2))), sp.pi / 6)
    verified += 1
    check_eq(
        "5-2-9-8",
        sp.integrate((2 * x**4 + 2 * x**2 + 1) / (x**2 + 1), (x, 0, 1)),
        sp.Rational(2, 3) + sp.pi / 4,
    )
    verified += 1
    check_eq("5-2-9-9", sp.integrate(1 / (2 + x), (x, -sp.E**2 - 2, -3)), -2)
    verified += 1
    check_eq("5-2-9-10", sp.integrate(sp.cot(x) ** 2, (x, sp.pi / 4, sp.pi / 2)), 1 - sp.pi / 4)
    verified += 1
    check_eq("5-2-9-11", sp.integrate(sp.Abs(sp.cos(x)), (x, 0, 2 * sp.pi)), 4)
    verified += 1
    val_9_12 = sp.integrate(2 * x + 1, (x, 0, 1)) + sp.integrate(x**2, (x, 1, 3))
    check_eq("5-2-9-12", val_9_12, sp.Rational(32, 3))
    verified += 1

    # 5-2-10-1..4: Trig integrals on [0, 2*pi]
    check_eq("5-2-10-1", sp.integrate(sp.cos(m * x), (x, 0, 2 * sp.pi)), 0)
    verified += 1
    check_eq("5-2-10-2", sp.integrate(sp.sin(m * x), (x, 0, 2 * sp.pi)), 0)
    verified += 1
    check_eq("5-2-10-3", sp.integrate(sp.cos(m * x) ** 2, (x, 0, 2 * sp.pi)), sp.pi)
    verified += 1
    check_eq("5-2-10-4", sp.integrate(sp.sin(m * x) ** 2, (x, 0, 2 * sp.pi)), sp.pi)
    verified += 1

    # 5-2-11-1..3: Orthogonality on [0, 2*pi] for distinct positive integers
    for mv, kv in [(1, 2), (2, 5), (3, 4)]:
        check_eq(f"5-2-11-1 ({mv},{kv})", sp.integrate(sp.sin(mv * x) * sp.cos(kv * x), (x, 0, 2 * sp.pi)), 0)
        check_eq(f"5-2-11-2 ({mv},{kv})", sp.integrate(sp.cos(mv * x) * sp.cos(kv * x), (x, 0, 2 * sp.pi)), 0)
        check_eq(f"5-2-11-3 ({mv},{kv})", sp.integrate(sp.sin(mv * x) * sp.sin(kv * x), (x, 0, 2 * sp.pi)), 0)
    verified += 3

    # 5-2-12-1..2: Limits with variable-limit integrals
    num_12_1 = sp.Integral(sp.cos(t**2), (t, 0, 3 * x))
    check_eq("5-2-12-1", sp.limit(sp.diff(num_12_1, x) / sp.diff(x, x), x, 0), 3)
    verified += 1

    num_12_2 = sp.Integral(sp.exp(2 * t**2), (t, 0, x)) ** 2
    den_12_2 = sp.Integral(t * sp.exp(3 * t**2), (t, 0, x))
    # First L'Hopital: 2 e^(2x^2) int_0^x e^(2t^2) dt / (x e^(3x^2)) -> 2 * lim (int_0^x e^(2t^2) dt / x) = 2
    step1_num = sp.diff(num_12_2, x)
    step1_den = sp.diff(den_12_2, x)
    # Factor out e^(-x^2) and apply L'Hopital again to (int_0^x e^(2t^2) dt)/x
    lim_12_2 = sp.limit(2 * sp.exp(-(x**2)) * sp.exp(2 * x**2), x, 0)
    check_eq("5-2-12-2", lim_12_2, 2)
    # Also verify via series expansion
    int_num_s = sp.series(sp.exp(2 * t**2), t, 0, 6).removeO().integrate((t, 0, x)) ** 2
    int_den_s = sp.series(t * sp.exp(3 * t**2), t, 0, 6).removeO().integrate((t, 0, x))
    check_eq("5-2-12-2 (series)", sp.limit(int_num_s / int_den_s, x, 0), 2)
    verified += 1

    # 5-2-13: Piecewise integral continuity
    phi1 = sp.integrate(3 * t**2, (t, 0, x))
    phi2 = sp.integrate(3 * t**2, (t, 0, 1)) + sp.integrate(2 * t, (t, 1, x))
    check_eq("5-2-13 (part 1)", phi1, x**3)
    check_eq("5-2-13 (part 2)", phi2, x**2)
    check_eq("5-2-13 (cont)", phi1.subs(x, 1), phi2.subs(x, 1))
    verified += 1

    # 5-2-14: Piecewise trig integral
    phi14_mid = sp.integrate(sp.cos(t) / 2, (t, -sp.pi / 2, x))
    check_eq("5-2-14 (mid)", phi14_mid, (1 + sp.sin(x)) / 2)
    check_eq("5-2-14 (right)", phi14_mid.subs(x, sp.pi / 2), 1)
    verified += 1

    # 5-2-16-1: S_2(x) = int_0^x sin(pi t^2) dt is odd
    # d/dx [S_2(-x) + S_2(x)] = -sin(pi (-x)^2) + sin(pi x^2) = 0 and value at 0 is 0
    check_eq("5-2-16-1", -sp.sin(sp.pi * (-x) ** 2) + sp.sin(sp.pi * x**2), 0)
    verified += 1

    # 5-2-16-2: Local minima of S_2(x) = int_0^x sin(pi t^2) dt are (-1)^k * sqrt(k), k >= 1
    s2_p = sp.sin(sp.pi * x**2)
    s2_pp = sp.diff(s2_p, x)
    for kv in range(1, 7):
        x_min = ((-1) ** kv) * sp.sqrt(kv)
        check_eq(f"5-2-16-2 (crit k={kv})", s2_p.subs(x, x_min), 0)
        assert float(s2_pp.subs(x, x_min)) > 0, f"Not min at k={kv}"
    verified += 1

    print(f"ALL {verified} symbolic checks for Sections 5-1 and 5-2 PASSED!")


if __name__ == "__main__":
    main()
