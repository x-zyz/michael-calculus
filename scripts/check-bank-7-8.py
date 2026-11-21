#!/usr/bin/env python3
"""Symbolic verification for Section 7-8 (constant-coefficient nonhomogeneous linear ODEs)."""

import sympy as sp

x, t, g, v0, theta, h0, omega = sp.symbols("x t g v0 theta h0 omega", real=True)
C1, C2 = sp.symbols("C1 C2")


def check_ode(name: str, lhs_expr, rhs_expr, y_sol):
    """Verify that y_sol satisfies lhs_expr(y) == rhs_expr identically."""
    diff = sp.simplify(lhs_expr(y_sol) - rhs_expr)
    assert diff == 0, f"{name} failed ODE check: residual = {diff}"


def check_ivp(name: str, lhs_expr, rhs_expr, y_sol, x0, y0, yp0):
    """Verify ODE and initial conditions y(x0)=y0, y'(x0)=yp0."""
    check_ode(name, lhs_expr, rhs_expr, y_sol)
    val0 = sp.simplify(y_sol.subs(x, x0) - y0)
    valp0 = sp.simplify(sp.diff(y_sol, x).subs(x, x0) - yp0)
    assert val0 == 0, f"{name} failed y({x0})={y0}: residual = {val0}"
    assert valp0 == 0, f"{name} failed y'({x0})={yp0}: residual = {valp0}"


def main():
    # 1(1): 2y'' - y' - y = 5e^{2x}
    y1_1 = C1 * sp.exp(x) + C2 * sp.exp(-x / 2) + sp.exp(2 * x)
    check_ode("jc935-7-8-1-1", lambda y: 2 * sp.diff(y, x, 2) - sp.diff(y, x) - y, 5 * sp.exp(2 * x), y1_1)

    # 1(2): y'' + omega^2 y = 3e^{-2x}
    y1_2 = C1 * sp.cos(omega * x) + C2 * sp.sin(omega * x) + 3 * sp.exp(-2 * x) / (4 + omega**2)
    check_ode("jc935-7-8-1-2", lambda y: sp.diff(y, x, 2) + omega**2 * y, 3 * sp.exp(-2 * x), y1_2)

    # 1(3): y'' + 3y' = 9x^2 - 6x + 2
    y1_3 = C1 + C2 * sp.exp(-3 * x) + x**3 - 2 * x**2 + 2 * x
    check_ode("jc935-7-8-1-3", lambda y: sp.diff(y, x, 2) + 3 * sp.diff(y, x), 9 * x**2 - 6 * x + 2, y1_3)

    # 1(4): y'' - 5y' + 6y = 4x e^{2x}
    y1_4 = C1 * sp.exp(2 * x) + C2 * sp.exp(3 * x) - (2 * x**2 + 4 * x) * sp.exp(2 * x)
    check_ode("jc935-7-8-1-4", lambda y: sp.diff(y, x, 2) - 5 * sp.diff(y, x) + 6 * y, 4 * x * sp.exp(2 * x), y1_4)

    # 1(5): y'' + 4y' + 13y = 6e^{-2x} cos(3x)
    y1_5 = sp.exp(-2 * x) * (C1 * sp.cos(3 * x) + C2 * sp.sin(3 * x)) + x * sp.exp(-2 * x) * sp.sin(3 * x)
    check_ode("jc935-7-8-1-5", lambda y: sp.diff(y, x, 2) + 4 * sp.diff(y, x) + 13 * y, 6 * sp.exp(-2 * x) * sp.cos(3 * x), y1_5)

    # 1(6): y'' + 4y' + 4y = (6x - 4)e^{-2x}
    y1_6 = (C1 + C2 * x + x**3 - 2 * x**2) * sp.exp(-2 * x)
    check_ode("jc935-7-8-1-6", lambda y: sp.diff(y, x, 2) + 4 * sp.diff(y, x) + 4 * y, (6 * x - 4) * sp.exp(-2 * x), y1_6)

    # 1(7): y'' - 4y' + 3y = 6x - 11
    y1_7 = C1 * sp.exp(x) + C2 * sp.exp(3 * x) + 2 * x - 1
    check_ode("jc935-7-8-1-7", lambda y: sp.diff(y, x, 2) - 4 * sp.diff(y, x) + 3 * y, 6 * x - 11, y1_7)

    # 1(8): y'' + 9y = 8x sin x
    y1_8 = C1 * sp.cos(3 * x) + C2 * sp.sin(3 * x) + x * sp.sin(x) - sp.Rational(1, 4) * sp.cos(x)
    check_ode("jc935-7-8-1-8", lambda y: sp.diff(y, x, 2) + 9 * y, 8 * x * sp.sin(x), y1_8)

    # 1(9): y'' + 4y = 5e^{-x} + 4 sin(2x)
    y1_9 = C1 * sp.cos(2 * x) + C2 * sp.sin(2 * x) + sp.exp(-x) - x * sp.cos(2 * x)
    check_ode("jc935-7-8-1-9", lambda y: sp.diff(y, x, 2) + 4 * y, 5 * sp.exp(-x) + 4 * sp.sin(2 * x), y1_9)

    # 1(10): y'' - 4y = 16 cos^2 x
    y1_10 = C1 * sp.exp(2 * x) + C2 * sp.exp(-2 * x) - 2 - sp.cos(2 * x)
    check_ode("jc935-7-8-1-10", lambda y: sp.diff(y, x, 2) - 4 * y, 16 * sp.cos(x) ** 2, y1_10)

    # 2(1): y'' + y - 3 cos(2x) = 0, y(pi)=2, y'(pi)=1
    y2_1 = -3 * sp.cos(x) - sp.sin(x) - sp.cos(2 * x)
    check_ivp("jc935-7-8-2-1", lambda y: sp.diff(y, x, 2) + y - 3 * sp.cos(2 * x), 0, y2_1, sp.pi, 2, 1)

    # 2(2): y'' - 5y' + 4y = 8, y(0)=5, y'(0)=6
    y2_2 = 2 * sp.exp(x) + sp.exp(4 * x) + 2
    check_ivp("jc935-7-8-2-2", lambda y: sp.diff(y, x, 2) - 5 * sp.diff(y, x) + 4 * y, 8, y2_2, 0, 5, 6)

    # 2(3): y'' - 7y' + 6y = 4e^{2x}, y(0)=2, y'(0)=11
    y2_3 = sp.exp(x) + 2 * sp.exp(6 * x) - sp.exp(2 * x)
    check_ivp("jc935-7-8-2-3", lambda y: sp.diff(y, x, 2) - 7 * sp.diff(y, x) + 6 * y, 4 * sp.exp(2 * x), y2_3, 0, 2, 11)

    # 2(4): y'' - 4y = 16x e^{2x}, y(0)=1, y'(0)=5
    y2_4 = (2 * x**2 - x + 2) * sp.exp(2 * x) - sp.exp(-2 * x)
    check_ivp("jc935-7-8-2-4", lambda y: sp.diff(y, x, 2) - 4 * y, 16 * x * sp.exp(2 * x), y2_4, 0, 1, 5)

    # 2(5): y'' + 3y' = 6, y(0)=3, y'(0)=-1
    y2_5 = 2 + sp.exp(-3 * x) + 2 * x
    check_ivp("jc935-7-8-2-5", lambda y: sp.diff(y, x, 2) + 3 * sp.diff(y, x), 6, y2_5, 0, 3, -1)

    # 3: y'' + py' + qy = 0 has general solution (C1 + C2 x)e^{-2x} => p=4, q=4;
    #    y'' + 4y' + 4y = 4x + 4, y(0)=1, y'(0)=3
    p_val, q_val = 4, 4
    y3_hom = (C1 + C2 * x) * sp.exp(-2 * x)
    check_ode("jc935-7-8-3-hom", lambda y: sp.diff(y, x, 2) + p_val * sp.diff(y, x) + q_val * y, 0, y3_hom)
    y3_sol = (1 + 4 * x) * sp.exp(-2 * x) + x
    check_ivp("jc935-7-8-3", lambda y: sp.diff(y, x, 2) + p_val * sp.diff(y, x) + q_val * y, 4 * x + 4, y3_sol, 0, 1, 3)

    # 4: Projectile motion from height h0 with speed v0, angle theta
    xt = v0 * t * sp.cos(theta)
    yt = h0 + v0 * t * sp.sin(theta) - sp.Rational(1, 2) * g * t**2
    assert sp.simplify(sp.diff(xt, t, 2)) == 0
    assert sp.simplify(xt.subs(t, 0)) == 0
    assert sp.simplify(sp.diff(xt, t).subs(t, 0) - v0 * sp.cos(theta)) == 0
    assert sp.simplify(sp.diff(yt, t, 2) + g) == 0
    assert sp.simplify(yt.subs(t, 0) - h0) == 0
    assert sp.simplify(sp.diff(yt, t).subs(t, 0) - v0 * sp.sin(theta)) == 0

    # 5: RLC series circuit: R=400, L=0.2, C=2.5e-6, E=12
    R = sp.Integer(400)
    L = sp.Rational(1, 5)
    C_cap = sp.Rational(5, 2) * sp.Integer(10) ** (-6)
    E = sp.Integer(12)
    uC = 12 - 12 * sp.exp(-1000 * t) * (sp.cos(1000 * t) + sp.sin(1000 * t))
    i_t = sp.Rational(3, 50) * sp.exp(-1000 * t) * sp.sin(1000 * t)
    assert sp.simplify(L * C_cap * sp.diff(uC, t, 2) + R * C_cap * sp.diff(uC, t) + uC - E) == 0
    assert sp.simplify(uC.subs(t, 0)) == 0
    assert sp.simplify(sp.diff(uC, t).subs(t, 0)) == 0
    assert sp.simplify(C_cap * sp.diff(uC, t) - i_t) == 0

    # 6: Volterra integral equation:
    #    phi(x) = 5e^{-x} - 4x \int_0^x phi(t) dt + 4 \int_0^x t phi(t) dt
    phi = 4 * sp.cos(2 * x) - 2 * sp.sin(2 * x) + sp.exp(-x)
    phi_t = phi.subs(x, t)
    rhs_int = 5 * sp.exp(-x) - 4 * x * sp.integrate(phi_t, (t, 0, x)) + 4 * sp.integrate(t * phi_t, (t, 0, x))
    assert sp.simplify(phi - rhs_int) == 0, f"jc935-7-8-6 failed integral check: {sp.simplify(phi - rhs_int)}"

    print("All 19 symbolic checks for Section 7-8 PASSED!")


if __name__ == "__main__":
    main()
