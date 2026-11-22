#!/usr/bin/env python3
"""Symbolic verification for Section 6-2 (bankIntegralGeometry.ts) using SymPy."""

import sympy as sp

x, y, t, theta, z = sp.symbols("x y t theta z", real=True)
a, b, c, h, k, p, q, r, R, A, B, alpha = sp.symbols(
    "a b c h k p q r R A B alpha", positive=True
)


def check_eq(item_id: str, lhs, rhs):
    diff = sp.simplify(sp.expand(lhs - rhs))
    if diff != 0:
        # Try trigonometric / logarithmic / radical simplification
        diff = sp.simplify(sp.trigsimp(sp.radsimp(lhs - rhs)))
    if diff != 0:
        diff = sp.simplify(sp.powsimp(sp.logcombine(diff.rewrite(sp.log), force=True)))
    assert diff == 0, f"[FAIL] {item_id}: lhs={lhs}, rhs={rhs}, diff={diff}"
    print(f"[PASS] {item_id}")


def main():
    # 6-2-1-1: y = 2*sqrt(x) and y = x on [0, 4]
    check_eq("jc935-6-2-1-1", sp.integrate(2 * sp.sqrt(x) - x, (x, 0, 4)), sp.Rational(8, 3))

    # 6-2-1-2: y = e^(2x), y = e^2, y-axis on [0, 1]
    check_eq("jc935-6-2-1-2", sp.integrate(sp.E**2 - sp.exp(2 * x), (x, 0, 1)), (sp.E**2 + 1) / 2)

    # 6-2-1-3: y = 4 - x^2 and y = 3x on [-4, 1]
    check_eq("jc935-6-2-1-3", sp.integrate(4 - x**2 - 3 * x, (x, -4, 1)), sp.Rational(125, 6))

    # 6-2-1-4: y = x^2 and y = 2x + 8 on [-2, 4]
    check_eq("jc935-6-2-1-4", sp.integrate(2 * x + 8 - x**2, (x, -2, 4)), 36)

    # 6-2-2-1: y = x^2 and x^2 + y^2 = 2 (both parts)
    A1 = sp.integrate(sp.sqrt(2 - x**2) - x**2, (x, -1, 1))
    A2 = 2 * sp.pi - A1
    check_eq("jc935-6-2-2-1 (A1)", A1, sp.pi / 2 + sp.Rational(1, 3))
    check_eq("jc935-6-2-2-1 (A2)", A2, 3 * sp.pi / 2 - sp.Rational(1, 3))

    # 6-2-2-2: y = 2/x, y = 2x, x = 3 on [1, 3]
    check_eq("jc935-6-2-2-2", sp.integrate(2 * x - 2 / x, (x, 1, 3)), 8 - 2 * sp.log(3))

    # 6-2-2-3: y = e^(2x), y = e^(-2x), x = 1 on [0, 1]
    check_eq(
        "jc935-6-2-2-3",
        sp.integrate(sp.exp(2 * x) - sp.exp(-2 * x), (x, 0, 1)),
        (sp.E**2 + sp.E**(-2)) / 2 - 1,
    )

    # 6-2-2-4: y = ln(2x), y-axis, y = ln(p), y = ln(q)
    check_eq("jc935-6-2-2-4", sp.integrate(sp.exp(y) / 2, (y, sp.log(p), sp.log(q))), (q - p) / 2)

    # 6-2-3: y = -x^2 + 6x - 5 and tangents at (1,0), (5,0)
    f3 = -x**2 + 6 * x - 5
    t1 = 4 * x - 4
    t2 = -4 * x + 20
    area3 = sp.integrate(t1 - f3, (x, 1, 3)) + sp.integrate(t2 - f3, (x, 3, 5))
    check_eq("jc935-6-2-3", area3, sp.Rational(16, 3))

    # 6-2-4: y^2 = 2px and normal at (2p, 2p) -> x = 3p - y/2
    area4 = sp.integrate(3 * p - y / 2 - y**2 / (2 * p), (y, -3 * p, 2 * p))
    check_eq("jc935-6-2-4", area4, sp.Rational(125, 12) * p**2)

    # 6-2-5: y = cos x on [0, pi/2] split into 1:2:1 by y = k*sin x and y = m*sin x
    k_val = sp.Rational(15, 8)
    m_val = sp.Rational(7, 24)
    A_left = sp.integrate(sp.cos(x) - k_val * sp.sin(x), (x, 0, sp.atan(1 / k_val)))
    A_right = sp.integrate(m_val * sp.sin(x), (x, 0, sp.atan(1 / m_val))) + sp.integrate(
        sp.cos(x), (x, sp.atan(1 / m_val), sp.pi / 2)
    )
    check_eq("jc935-6-2-5 (k=15/8)", A_left, sp.Rational(1, 4))
    check_eq("jc935-6-2-5 (m=7/24)", A_right, sp.Rational(1, 4))

    # 6-2-6-1: r = 4a*sin(theta)
    check_eq("jc935-6-2-6-1", sp.Rational(1, 2) * sp.integrate((4 * a * sp.sin(theta))**2, (theta, 0, sp.pi)), 4 * sp.pi * a**2)

    # 6-2-6-2: x = 2a*cos^3(t), y = a*sin^3(t)
    area6_2 = 4 * sp.integrate(a * sp.sin(t)**3 * (-sp.diff(2 * a * sp.cos(t)**3, t)), (t, 0, sp.pi / 2))
    check_eq("jc935-6-2-6-2", area6_2, sp.Rational(3, 4) * sp.pi * a**2)

    # 6-2-6-3: r = a*(3 + sin(theta))
    check_eq(
        "jc935-6-2-6-3",
        sp.Rational(1, 2) * sp.integrate((a * (3 + sp.sin(theta)))**2, (theta, 0, 2 * sp.pi)),
        sp.Rational(19, 2) * sp.pi * a**2,
    )

    # 6-2-7: x = 2a*(t - sin t), y = a*(1 - cos t), 0 <= t <= 2pi
    area7 = sp.integrate(a * (1 - sp.cos(t)) * sp.diff(2 * a * (t - sp.sin(t)), t), (t, 0, 2 * sp.pi))
    check_eq("jc935-6-2-7", area7, 6 * sp.pi * a**2)

    # 6-2-8: r = a*e^(2*theta), 0 <= theta <= pi
    check_eq(
        "jc935-6-2-8",
        sp.Rational(1, 2) * sp.integrate((a * sp.exp(2 * theta))**2, (theta, 0, sp.pi)),
        a**2 * (sp.exp(4 * sp.pi) - 1) / 8,
    )

    # 6-2-9-1: common area of r = 2*cos(theta) and r = 2*(1 - cos(theta))
    area9_1 = 2 * (
        sp.Rational(1, 2) * sp.integrate((2 * (1 - sp.cos(theta)))**2, (theta, 0, sp.pi / 3))
        + sp.Rational(1, 2) * sp.integrate((2 * sp.cos(theta))**2, (theta, sp.pi / 3, sp.pi / 2))
    )
    check_eq("jc935-6-2-9-1", area9_1, sp.Rational(7, 3) * sp.pi - 4 * sp.sqrt(3))

    # 6-2-9-2: common area of r = 1 and r^2 = 2*cos(2*theta)
    area9_2 = 4 * (
        sp.Rational(1, 2) * sp.integrate(1, (theta, 0, sp.pi / 6))
        + sp.Rational(1, 2) * sp.integrate(2 * sp.cos(2 * theta), (theta, sp.pi / 6, sp.pi / 4))
    )
    check_eq("jc935-6-2-9-2", area9_2, sp.pi / 3 + 2 - sp.sqrt(3))

    # 6-2-10: below y = e^(2x), left of tangent y = 2ex, above x-axis
    area10 = sp.integrate(sp.exp(2 * x), (x, -sp.oo, 0)) + sp.integrate(sp.exp(2 * x) - 2 * sp.E * x, (x, 0, sp.Rational(1, 2)))
    check_eq("jc935-6-2-10", area10, sp.E / 4)

    # 6-2-11: minimize A(c) = int_0^c (e^x - 1) dx + int_c^1 (e - e^x) dx
    c_sym = sp.Symbol("c_sym", real=True)
    A11 = sp.integrate(sp.exp(x) - 1, (x, 0, c_sym)) + sp.integrate(sp.E - sp.exp(x), (x, c_sym, 1))
    dA11 = sp.diff(A11, c_sym)
    d2A11 = sp.diff(dA11, c_sym)
    c_opt = sp.log((sp.E + 1) / 2)
    check_eq("jc935-6-2-11 (dA=0)", dA11.subs(c_sym, c_opt), 0)
    assert sp.simplify(d2A11.subs(c_sym, c_opt)) > 0

    # 6-2-12: y = p*x^2 + q*x tangent to x + y = 4 in Q1, max area with x-axis
    p_expr = -((q + 1)**2) / 16
    A12 = sp.integrate(p_expr * x**2 + q * x, (x, 0, -q / p_expr))
    check_eq("jc935-6-2-12 (A(q))", A12, 128 * q**3 / (3 * (q + 1)**4))
    check_eq("jc935-6-2-12 (dA=0 at q=3)", sp.diff(A12, q).subs(q, 3), 0)
    check_eq("jc935-6-2-12 (p at q=3)", p_expr.subs(q, 3), -1)
    check_eq("jc935-6-2-12 (A_max)", A12.subs(q, 3), sp.Rational(9, 2))

    # 6-2-13: y = x^2, x = 3, y = 0 around x-axis and y-axis
    Vx13 = sp.pi * sp.integrate((x**2)**2, (x, 0, 3))
    Vy13 = 2 * sp.pi * sp.integrate(x * x**2, (x, 0, 3))
    check_eq("jc935-6-2-13 (Vx)", Vx13, sp.Rational(243, 5) * sp.pi)
    check_eq("jc935-6-2-13 (Vy)", Vy13, sp.Rational(81, 2) * sp.pi)

    # 6-2-14: x = 2a*cos^3(t), y = a*sin^3(t) around x-axis
    V14 = 2 * sp.pi * sp.integrate((a * sp.sin(t)**3)**2 * (-sp.diff(2 * a * sp.cos(t)**3, t)), (t, 0, sp.pi / 2))
    check_eq("jc935-6-2-14", V14, sp.Rational(64, 105) * sp.pi * a**3)

    # 6-2-15: spherical zone volume between y = a and y = b
    a_r, b_r = sp.symbols("a_r b_r", real=True)
    V15 = sp.pi * sp.integrate(R**2 - y**2, (y, a_r, b_r))
    check_eq("jc935-6-2-15", V15, sp.pi * (b_r - a_r) * (R**2 - (a_r**2 + a_r * b_r + b_r**2) / 3))

    # 6-2-16-1: y = 2x^2, x = 2y^2 around y-axis
    V16_1 = sp.pi * sp.integrate((sp.sqrt(y / 2))**2 - (2 * y**2)**2, (y, 0, sp.Rational(1, 2)))
    check_eq("jc935-6-2-16-1", V16_1, sp.Rational(3, 80) * sp.pi)

    # 6-2-16-2: y = arccos x, x = 0, y = 0 around x-axis
    V16_2 = sp.pi * sp.integrate(sp.acos(x)**2, (x, 0, 1))
    check_eq("jc935-6-2-16-2", V16_2, sp.pi**2 - 2 * sp.pi)

    # 6-2-16-3: x^2 + (y - 4)^2 = 9 around x-axis
    V16_3 = sp.pi * sp.integrate((4 + sp.sqrt(9 - x**2))**2 - (4 - sp.sqrt(9 - x**2))**2, (x, -3, 3))
    check_eq("jc935-6-2-16-3", V16_3, 72 * sp.pi**2)

    # 6-2-16-4: cycloid one arch, y = 0, around y = 3a
    y_cyc = a * (1 - sp.cos(t))
    dx_cyc = a * (1 - sp.cos(t))
    V16_4 = sp.pi * sp.integrate(((3 * a)**2 - (3 * a - y_cyc)**2) * dx_cyc, (t, 0, 2 * sp.pi))
    check_eq("jc935-6-2-16-4", V16_4, 13 * sp.pi**2 * a**3)

    # 6-2-17: disk x^2 + y^2 <= r^2 around y = c (c > r > 0)
    V17 = sp.pi * sp.integrate((c + sp.sqrt(r**2 - x**2))**2 - (c - sp.sqrt(r**2 - x**2))**2, (x, -r, r))
    check_eq("jc935-6-2-17", V17, 2 * sp.pi**2 * r**2 * c)

    # 6-2-18: rectangular frustum height h, bases A x B and a x b
    u_z = A + (a - A) * z / h
    v_z = B + (b - B) * z / h
    V18 = sp.integrate(u_z * v_z, (z, 0, h))
    check_eq("jc935-6-2-18", V18, h * (2 * (A * B + a * b) + A * b + a * B) / 6)

    # 6-2-19: circular base radius R, square cross-sections
    V19 = sp.integrate(4 * (R**2 - x**2), (x, -R, R))
    check_eq("jc935-6-2-19", V19, sp.Rational(16, 3) * R**3)

    # 6-2-20: manual proof of cylindrical shell formula around x = c

    # 6-2-21-1: y = cos x on [0, pi/2] around y-axis via shells
    V21_1 = 2 * sp.pi * sp.integrate(x * sp.cos(x), (x, 0, sp.pi / 2))
    check_eq("jc935-6-2-21-1", V21_1, sp.pi**2 - 2 * sp.pi)

    # 6-2-21-2: y = cos x on [0, pi/2] around x = -pi/2 via shells
    V21_2 = 2 * sp.pi * sp.integrate((x + sp.pi / 2) * sp.cos(x), (x, 0, sp.pi / 2))
    check_eq("jc935-6-2-21-2", V21_2, 2 * sp.pi**2 - 2 * sp.pi)

    # 6-2-22-1 & 6-2-22-2: y = x^2, D1 on [a,3] around x-axis, D2 on [0,a] around y-axis
    V1_22 = sp.pi * sp.integrate(x**4, (x, a, 3))
    V2_22 = 2 * sp.pi * sp.integrate(x * x**2, (x, 0, a))
    check_eq("jc935-6-2-22-1 (V1)", V1_22, sp.pi * (243 - a**5) / 5)
    check_eq("jc935-6-2-22-1 (V2)", V2_22, sp.pi * a**4 / 2)
    Vtot_22 = V1_22 + V2_22
    check_eq("jc935-6-2-22-2 (dV=0 at a=2)", sp.diff(Vtot_22, a).subs(a, 2), 0)
    check_eq("jc935-6-2-22-2 (V_max)", Vtot_22.subs(a, 2), sp.Rational(251, 5) * sp.pi)

    # 6-2-23: arc length of y = ln x on [2*sqrt(2), sqrt(15)]
    s23 = sp.integrate(sp.sqrt(1 + (1 / x)**2), (x, 2 * sp.sqrt(2), sp.sqrt(15)))
    check_eq("jc935-6-2-23", s23, 1 + sp.Rational(1, 2) * sp.log(sp.Rational(6, 5)))

    # 6-2-24: y^2 = (4/9)*(x - 2)^3 cut by y^2 = (4/27)*x
    y24 = sp.Rational(2, 3) * (x - 2)**sp.Rational(3, 2)
    s24 = 2 * sp.integrate(sp.sqrt(1 + sp.diff(y24, x)**2), (x, 2, 3))
    check_eq("jc935-6-2-24", s24, sp.Rational(4, 3) * (2 * sp.sqrt(2) - 1))

    # 6-2-25: y = x^2 / (2p) from 0 to x0 > 0
    x0 = sp.Symbol("x0", positive=True)
    s25 = sp.integrate(sp.sqrt(1 + (t / p)**2), (t, 0, x0))
    rhs25 = x0 * sp.sqrt(p**2 + x0**2) / (2 * p) + p * sp.log((x0 + sp.sqrt(p**2 + x0**2)) / p) / 2
    check_eq("jc935-6-2-25", sp.diff(s25 - rhs25, x0), 0)
    check_eq("jc935-6-2-25 (at 0)", rhs25.subs(x0, 0), 0)

    # 6-2-26: astroid x = 3a*cos^3(t), y = 3a*sin^3(t) full length
    dx26 = sp.diff(3 * a * sp.cos(t)**3, t)
    dy26 = sp.diff(3 * a * sp.sin(t)**3, t)
    s26 = 4 * sp.integrate(sp.simplify(sp.sqrt(dx26**2 + dy26**2)), (t, 0, sp.pi / 2))
    check_eq("jc935-6-2-26", s26, 18 * a)

    # 6-2-27: involute x = a(cos t + t sin t), y = a(sin t - t cos t), 0 <= t <= 2pi
    dx27 = sp.diff(a * (sp.cos(t) + t * sp.sin(t)), t)
    dy27 = sp.diff(a * (sp.sin(t) - t * sp.cos(t)), t)
    s27 = sp.integrate(sp.simplify(sp.sqrt(dx27**2 + dy27**2)), (t, 0, 2 * sp.pi))
    check_eq("jc935-6-2-27", s27, 2 * sp.pi**2 * a)

    # 6-2-28: cycloid x = 2a(t - sin t), y = 2a(1 - cos t) split 3:1
    t0 = 4 * sp.pi / 3
    s28_part = sp.integrate(4 * a * sp.sin(t / 2), (t, 0, t0))
    s28_full = sp.integrate(4 * a * sp.sin(t / 2), (t, 0, 2 * sp.pi))
    check_eq("jc935-6-2-28 (ratio 3/4)", s28_part / s28_full, sp.Rational(3, 4))
    check_eq("jc935-6-2-28 (x coord)", 2 * a * (t0 - sp.sin(t0)), (sp.Rational(8, 3) * sp.pi + sp.sqrt(3)) * a)
    check_eq("jc935-6-2-28 (y coord)", 2 * a * (1 - sp.cos(t0)), 3 * a)

    # 6-2-29: r = 2*e^(k*theta) on [0, alpha]
    r29 = 2 * sp.exp(k * theta)
    s29 = sp.integrate(sp.simplify(sp.sqrt(r29**2 + sp.diff(r29, theta)**2)), (theta, 0, alpha))
    check_eq("jc935-6-2-29", s29, 2 * sp.sqrt(1 + k**2) * (sp.exp(k * alpha) - 1) / k)

    # 6-2-30: r*theta = 2 on [5/12, 12/5]
    r30 = 2 / theta
    s30 = sp.integrate(sp.sqrt(r30**2 + sp.diff(r30, theta)**2), (theta, sp.Rational(5, 12), sp.Rational(12, 5)))
    check_eq("jc935-6-2-30", s30, sp.Rational(91, 30) + 2 * sp.log(sp.Rational(10, 3)))

    print("ALL 43 SYMBOLIC CHECKS PASSED (1 manual proof: jc935-6-2-20).")


if __name__ == "__main__":
    main()
