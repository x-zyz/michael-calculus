#!/usr/bin/env python3
"""Symbolic verification for bankOdeEulerSystems.ts (Sections 7-9 and 7-10).

Verifies all 20 items (8 Euler ODEs in 7-9, 12 linear constant-coefficient ODE
systems in 7-10) by direct substitution into the differential equations and
initial conditions using SymPy.
"""

import sympy as sp

x, t = sp.symbols("x t", positive=True)
C1, C2, C3, C4 = sp.symbols("C1 C2 C3 C4")


def check_zero(name: str, expr: sp.Expr) -> None:
    diff = sp.simplify(sp.expand(expr))
    assert diff == 0, f"{name} FAILED: residual = {diff}"


def verify_all() -> None:
    # ==================== Section 7-9: Euler ODEs ====================

    # jc935-7-9-1: x^2 y'' + x y' - 9 y = 0
    y = C1 * x**3 + C2 / x**3
    check_zero("jc935-7-9-1", x**2 * sp.diff(y, x, 2) + x * sp.diff(y, x) - 9 * y)

    # jc935-7-9-2: y'' + (3/x) y' + (1/x^2) y = 4 / x^3
    y = (C1 + C2 * sp.log(x) + 2 * sp.log(x) ** 2) / x
    check_zero(
        "jc935-7-9-2",
        sp.diff(y, x, 2) + (3 / x) * sp.diff(y, x) + (1 / x**2) * y - 4 / x**3,
    )

    # jc935-7-9-3: x^3 y''' + 2 x^2 y'' - 8 x y' + 12 y = 0
    y = x**2 * (C1 + C2 * sp.log(x)) + C3 / x**3
    check_zero(
        "jc935-7-9-3",
        x**3 * sp.diff(y, x, 3)
        + 2 * x**2 * sp.diff(y, x, 2)
        - 8 * x * sp.diff(y, x)
        + 12 * y,
    )

    # jc935-7-9-4: x^2 y'' - 3 x y' + 3 y = 3 ln^2 x - 2 ln x
    y = C1 * x + C2 * x**3 + sp.log(x) ** 2 + 2 * sp.log(x) + 2
    check_zero(
        "jc935-7-9-4",
        x**2 * sp.diff(y, x, 2)
        - 3 * x * sp.diff(y, x)
        + 3 * y
        - (3 * sp.log(x) ** 2 - 2 * sp.log(x)),
    )

    # jc935-7-9-5: x^2 y'' + 2 x y' - 6 y = 14 x^4
    y = C1 * x**2 + C2 / x**3 + x**4
    check_zero(
        "jc935-7-9-5",
        x**2 * sp.diff(y, x, 2) + 2 * x * sp.diff(y, x) - 6 * y - 14 * x**4,
    )

    # jc935-7-9-6: x^2 y'' - 3 x y' + 8 y = 3 x^2 cos(ln x)
    y = x**2 * (C1 * sp.cos(2 * sp.log(x)) + C2 * sp.sin(2 * sp.log(x))) + x**2 * sp.cos(
        sp.log(x)
    )
    check_zero(
        "jc935-7-9-6",
        x**2 * sp.diff(y, x, 2)
        - 3 * x * sp.diff(y, x)
        + 8 * y
        - 3 * x**2 * sp.cos(sp.log(x)),
    )

    # jc935-7-9-7: x^2 y'' - 5 x y' + 9 y = 4 x + 6 x^3 ln x
    y = x**3 * (C1 + C2 * sp.log(x)) + x + x**3 * sp.log(x) ** 3
    check_zero(
        "jc935-7-9-7",
        x**2 * sp.diff(y, x, 2)
        - 5 * x * sp.diff(y, x)
        + 9 * y
        - (4 * x + 6 * x**3 * sp.log(x)),
    )

    # jc935-7-9-8: x^3 y''' + 4 x^2 y'' + 3 x y' + y = 8 x ln x + 4 / x
    y = (
        C1 / x
        + C2 * sp.cos(sp.log(x))
        + C3 * sp.sin(sp.log(x))
        + x * (2 * sp.log(x) - 3)
        + 2 * sp.log(x) / x
    )
    check_zero(
        "jc935-7-9-8",
        x**3 * sp.diff(y, x, 3)
        + 4 * x**2 * sp.diff(y, x, 2)
        + 3 * x * sp.diff(y, x)
        + y
        - (8 * x * sp.log(x) + 4 / x),
    )

    # ==================== Section 7-10: ODE Systems ====================

    # jc935-7-10-1-1: dy/dx = 2z, dz/dx = 2y
    y_sol = C1 * sp.exp(2 * x) + C2 * sp.exp(-2 * x)
    z_sol = C1 * sp.exp(2 * x) - C2 * sp.exp(-2 * x)
    check_zero("jc935-7-10-1-1 eq1", sp.diff(y_sol, x) - 2 * z_sol)
    check_zero("jc935-7-10-1-1 eq2", sp.diff(z_sol, x) - 2 * y_sol)

    # jc935-7-10-1-2: d^2 x/dt^2 = 4y, d^2 y/dt^2 = 4x
    x_sol = (
        C1 * sp.exp(2 * t)
        + C2 * sp.exp(-2 * t)
        + C3 * sp.cos(2 * t)
        + C4 * sp.sin(2 * t)
    )
    y_sol = (
        C1 * sp.exp(2 * t)
        + C2 * sp.exp(-2 * t)
        - C3 * sp.cos(2 * t)
        - C4 * sp.sin(2 * t)
    )
    check_zero("jc935-7-10-1-2 eq1", sp.diff(x_sol, t, 2) - 4 * y_sol)
    check_zero("jc935-7-10-1-2 eq2", sp.diff(y_sol, t, 2) - 4 * x_sol)

    # jc935-7-10-1-3: x'+y' = -2x+2y+8, x'-y' = 2x+2y-8
    x_sol = C1 * sp.cos(2 * t) + C2 * sp.sin(2 * t) + 4
    y_sol = -C1 * sp.sin(2 * t) + C2 * sp.cos(2 * t)
    check_zero(
        "jc935-7-10-1-3 eq1",
        sp.diff(x_sol, t) + sp.diff(y_sol, t) - (-2 * x_sol + 2 * y_sol + 8),
    )
    check_zero(
        "jc935-7-10-1-3 eq2",
        sp.diff(x_sol, t) - sp.diff(y_sol, t) - (2 * x_sol + 2 * y_sol - 8),
    )

    # jc935-7-10-1-4: x'+4x+y = 4 e^t, y'-6x-3y = 6 e^(3t)
    x_sol = C1 * sp.exp(2 * t) + C2 * sp.exp(-3 * t) + 2 * sp.exp(t) - sp.exp(3 * t)
    y_sol = (
        -6 * C1 * sp.exp(2 * t)
        - C2 * sp.exp(-3 * t)
        - 6 * sp.exp(t)
        + 7 * sp.exp(3 * t)
    )
    check_zero(
        "jc935-7-10-1-4 eq1", sp.diff(x_sol, t) + 4 * x_sol + y_sol - 4 * sp.exp(t)
    )
    check_zero(
        "jc935-7-10-1-4 eq2", sp.diff(y_sol, t) - 6 * x_sol - 3 * y_sol - 6 * sp.exp(3 * t)
    )

    # jc935-7-10-1-5: x'+6x+y'+y = 2t, 8x+y'+2y = 4t^2
    y_sol = C1 * sp.cos(2 * t) + C2 * sp.sin(2 * t) + 6 * t**2 - 2 * t - 3
    x_sol = (
        -sp.Rational(1, 4) * (C1 + C2) * sp.cos(2 * t)
        + sp.Rational(1, 4) * (C1 - C2) * sp.sin(2 * t)
        - t**2
        - t
        + 1
    )
    check_zero(
        "jc935-7-10-1-5 eq1",
        sp.diff(x_sol, t) + 6 * x_sol + sp.diff(y_sol, t) + y_sol - 2 * t,
    )
    check_zero(
        "jc935-7-10-1-5 eq2",
        8 * x_sol + sp.diff(y_sol, t) + 2 * y_sol - 4 * t**2,
    )

    # jc935-7-10-1-6: x'-x+2y'+2y = 2 cos t, 2x'+x+y' = -sin t
    # (3D^2 + 7D + 2)x = -2 cos t
    # At D^2 = -1: (7D - 1)x* = -2 cos t -> -50 x* = (7D + 1)(-2 cos t) = 14 sin t - 2 cos t
    # => x* = (1/25) cos t - (7/25) sin t
    x_sol = (
        C1 * sp.exp(-2 * t)
        + C2 * sp.exp(-sp.Rational(1, 3) * t)
        + sp.Rational(1, 25) * sp.cos(t)
        - sp.Rational(7, 25) * sp.sin(t)
    )
    # y = 1/2 [(3D + 3)x + 2 cos t + 2 sin t]
    y_sol = sp.simplify(
        sp.Rational(1, 2) * (3 * sp.diff(x_sol, t) + 3 * x_sol + 2 * sp.cos(t) + 2 * sp.sin(t))
    )
    y_expected = (
        -sp.Rational(3, 2) * C1 * sp.exp(-2 * t)
        + C2 * sp.exp(-sp.Rational(1, 3) * t)
        + sp.Rational(16, 25) * sp.cos(t)
        + sp.Rational(13, 25) * sp.sin(t)
    )
    check_zero("jc935-7-10-1-6 y_form", y_sol - y_expected)
    check_zero(
        "jc935-7-10-1-6 eq1",
        sp.diff(x_sol, t) - x_sol + 2 * sp.diff(y_expected, t) + 2 * y_expected - 2 * sp.cos(t),
    )
    check_zero(
        "jc935-7-10-1-6 eq2",
        2 * sp.diff(x_sol, t) + x_sol + sp.diff(y_expected, t) + sp.sin(t),
    )

    # jc935-7-10-2-1: x' = 3y, y' = -3x; x(0) = 2, y(0) = 0
    x_sol = 2 * sp.cos(3 * t)
    y_sol = -2 * sp.sin(3 * t)
    check_zero("jc935-7-10-2-1 eq1", sp.diff(x_sol, t) - 3 * y_sol)
    check_zero("jc935-7-10-2-1 eq2", sp.diff(y_sol, t) + 3 * x_sol)
    check_zero("jc935-7-10-2-1 ic1", x_sol.subs(t, 0) - 2)
    check_zero("jc935-7-10-2-1 ic2", y_sol.subs(t, 0) - 0)

    # jc935-7-10-2-2: x'' + 2y' - 4x = 0, x' + y = 0; x(0) = 0, y(0) = -2
    x_sol = sp.sin(2 * t)
    y_sol = -2 * sp.cos(2 * t)
    check_zero(
        "jc935-7-10-2-2 eq1", sp.diff(x_sol, t, 2) + 2 * sp.diff(y_sol, t) - 4 * x_sol
    )
    check_zero("jc935-7-10-2-2 eq2", sp.diff(x_sol, t) + y_sol)
    check_zero("jc935-7-10-2-2 ic1", x_sol.subs(t, 0) - 0)
    check_zero("jc935-7-10-2-2 ic2", y_sol.subs(t, 0) - (-2))

    # jc935-7-10-2-3: x'+2x-y = 0, y'-6x+y = 0; x(0) = 2, y(0) = 1
    x_sol = sp.exp(t) + sp.exp(-4 * t)
    y_sol = 3 * sp.exp(t) - 2 * sp.exp(-4 * t)
    check_zero("jc935-7-10-2-3 eq1", sp.diff(x_sol, t) + 2 * x_sol - y_sol)
    check_zero("jc935-7-10-2-3 eq2", sp.diff(y_sol, t) - 6 * x_sol + y_sol)
    check_zero("jc935-7-10-2-3 ic1", x_sol.subs(t, 0) - 2)
    check_zero("jc935-7-10-2-3 ic2", y_sol.subs(t, 0) - 1)

    # jc935-7-10-2-4: 2x'-7x+y'-y = 8 e^(2t), x'+3x+y = 0; x(0) = 1, y(0) = 1
    x_sol = 2 * sp.cos(2 * t) - sp.sin(2 * t) - sp.exp(2 * t)
    y_sol = -4 * sp.cos(2 * t) + 7 * sp.sin(2 * t) + 5 * sp.exp(2 * t)
    check_zero(
        "jc935-7-10-2-4 eq1",
        2 * sp.diff(x_sol, t) - 7 * x_sol + sp.diff(y_sol, t) - y_sol - 8 * sp.exp(2 * t),
    )
    check_zero("jc935-7-10-2-4 eq2", sp.diff(x_sol, t) + 3 * x_sol + y_sol)
    check_zero("jc935-7-10-2-4 ic1", x_sol.subs(t, 0) - 1)
    check_zero("jc935-7-10-2-4 ic2", y_sol.subs(t, 0) - 1)

    # jc935-7-10-2-5: x'+4x-y' = 20 sin(2t), x'+y'+4y = 4 e^(-4t); x(0) = -4, y(0) = 0
    x_sol = (
        -3 * sp.cos(2 * t)
        + 4 * sp.sin(2 * t)
        - sp.exp(-4 * t)
        - sp.exp(-2 * t) * sp.sin(2 * t)
    )
    y_sol = -sp.cos(2 * t) - 2 * sp.sin(2 * t) + sp.exp(-2 * t) * sp.cos(2 * t)
    check_zero(
        "jc935-7-10-2-5 eq1",
        sp.diff(x_sol, t) + 4 * x_sol - sp.diff(y_sol, t) - 20 * sp.sin(2 * t),
    )
    check_zero(
        "jc935-7-10-2-5 eq2",
        sp.diff(x_sol, t) + sp.diff(y_sol, t) + 4 * y_sol - 4 * sp.exp(-4 * t),
    )
    check_zero("jc935-7-10-2-5 ic1", x_sol.subs(t, 0) - (-4))
    check_zero("jc935-7-10-2-5 ic2", y_sol.subs(t, 0) - 0)

    # jc935-7-10-2-6: x'-2x+y'+2y = 3 e^(-t) - 2, x'+x+y'+3y = 3 e^(2t) + 4t; x(0) = 2, y(0) = -4
    x_sol = sp.exp(-4 * t) - sp.exp(-t) + sp.exp(2 * t) + t + 1
    y_sol = -3 * sp.exp(-4 * t) + t - 1
    check_zero(
        "jc935-7-10-2-6 eq1",
        sp.diff(x_sol, t)
        - 2 * x_sol
        + sp.diff(y_sol, t)
        + 2 * y_sol
        - (3 * sp.exp(-t) - 2),
    )
    check_zero(
        "jc935-7-10-2-6 eq2",
        sp.diff(x_sol, t)
        + x_sol
        + sp.diff(y_sol, t)
        + 3 * y_sol
        - (3 * sp.exp(2 * t) + 4 * t),
    )
    check_zero("jc935-7-10-2-6 ic1", x_sol.subs(t, 0) - 2)
    check_zero("jc935-7-10-2-6 ic2", y_sol.subs(t, 0) - (-4))

    print("ALL 20 ITEMS IN SECTIONS 7-9 AND 7-10 VERIFIED SYMBOLICALLY WITH SYMPY!")


if __name__ == "__main__":
    verify_all()
