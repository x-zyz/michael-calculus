#!/usr/bin/env python3
"""Symbolic verification for Chapter 7 Review (7-review) original ODE variants."""

import sympy as sp

x, t, C, C1, C2, C3, C4, b, k, v = sp.symbols("x t C C1 C2 C3 C4 b k v", real=True)
xp = sp.Symbol("xp", positive=True)
yp = sp.Symbol("yp", positive=True)
kp = sp.Symbol("kp", positive=True)


def check_zero(name: str, expr):
    simplified = sp.simplify(sp.expand(expr))
    assert simplified == 0, f"{name} FAILED: got {simplified}"
    print(f"[PASS] {name}")


def main():
    # 1(2): y' - a(x)y = b(x)
    a_fn = sp.Function("a")(x)
    b_fn = sp.Function("b")(x)
    I_a = sp.Integral(a_fn, x)
    y_1_2 = sp.exp(I_a) * (sp.Integral(b_fn * sp.exp(-I_a), x) + C)
    check_zero("7-review-1-2", sp.diff(y_1_2, x) - a_fn * y_1_2 - b_fn)

    # 1(4): y1=e^x, y2=e^x+x, y3=e^x+x^3 -> general solution C1*x + C2*x^3 + e^x
    u1, u2 = x, x**3
    W_1_4 = sp.simplify(u1 * sp.diff(u2, x) - sp.diff(u1, x) * u2)
    assert W_1_4 == 2 * x**3
    # Homogeneous ODE with basis {x, x^3}: x^2 y'' - 3x y' + 3y = 0
    y_1_4 = C1 * x + C2 * x**3 + sp.exp(x)
    rhs_1_4 = (x**2 - 3 * x + 3) * sp.exp(x)
    check_zero("7-review-1-4", x**2 * sp.diff(y_1_4, x, 2) - 3 * x * sp.diff(y_1_4, x) + 3 * y_1_4 - rhs_1_4)

    # 2(2): y1=e^(2x), y2=3x*e^(2x), y3=-2e^(-x) -> y''' - 3y'' + 4y = 0
    for idx, sol in enumerate([sp.exp(2 * x), 3 * x * sp.exp(2 * x), -2 * sp.exp(-x)], 1):
        check_zero(f"7-review-2-2-sol{idx}", sp.diff(sol, x, 3) - 3 * sp.diff(sol, x, 2) + 4 * sol)

    # 3(1): (y+C)^2 + x^2 = 4 -> x^2(1 + y'^2) = 4 y'^2
    y_3_1 = -C + sp.sqrt(4 - x**2)
    dy_3_1 = sp.diff(y_3_1, x)
    check_zero("7-review-3-1", x**2 * (1 + dy_3_1**2) - 4 * dy_3_1**2)

    # 3(2): y = C1*e^(-x) + C2*e^(3x) -> y'' - 2y' - 3y = 0
    y_3_2 = C1 * sp.exp(-x) + C2 * sp.exp(3 * x)
    check_zero("7-review-3-2", sp.diff(y_3_2, x, 2) - 2 * sp.diff(y_3_2, x) - 3 * y_3_2)

    # 4(1): x*y' + y = 3*sqrt(x*y) -> 3x - 2*sqrt(x*y) = C
    # Implicit verification: y = (3*xp - C)^2 / (4*xp) on 3*xp - C > 0
    u_4_1 = sp.Symbol("u_4_1", positive=True)
    # Use implicit differentiation of F(x,y) = 3x - 2*sqrt(x*y) - C = 0
    F_4_1 = 3 * xp - 2 * sp.sqrt(xp * yp) - C
    dy_dx_4_1 = -sp.diff(F_4_1, xp) / sp.diff(F_4_1, yp)
    check_zero("7-review-4-1", xp * dy_dx_4_1 + yp - 3 * sp.sqrt(xp * yp))

    # 4(2): x*y'*ln(x) + y = b*x^3*(3*ln(x) + 1) -> y = b*x^3 + C/ln(x)
    y_4_2 = b * xp**3 + C / sp.log(xp)
    check_zero("7-review-4-2", xp * sp.diff(y_4_2, xp) * sp.log(xp) + y_4_2 - b * xp**3 * (3 * sp.log(xp) + 1))

    # 4(3): dy/dx = y / (3*(ln(y) - x)) -> x = ln(y) - 1/3 + C/y^3
    x_4_3 = sp.log(yp) - sp.Rational(1, 3) + C / yp**3
    dx_dy_4_3 = sp.diff(x_4_3, yp)
    check_zero("7-review-4-3", dx_dy_4_3 - 3 * (sp.log(yp) - x_4_3) / yp)

    # 4(4): y' + 2*x*y = 2*x^3*y^3 -> 1/y^2 = x^2 + 1/2 + C*e^(2x^2)
    z_4_4 = x**2 + sp.Rational(1, 2) + C * sp.exp(2 * x**2)
    y_4_4 = 1 / sp.sqrt(z_4_4)
    check_zero("7-review-4-4", sp.diff(y_4_4, x) + 2 * x * y_4_4 - 2 * x**3 * y_4_4**3)

    # 4(5): y'' + (y')^2 + 4 = 0 -> y = ln|cos(2x + C1)| + C2
    y_4_5 = sp.log(sp.cos(2 * x + C1)) + C2
    check_zero("7-review-4-5", sp.diff(y_4_5, x, 2) + sp.diff(y_4_5, x) ** 2 + 4)

    # 4(6): y*y'' - (y')^2 - 4 = 0 -> y = (2/C1)*cosh(C1*x + C2)
    C1p = sp.Symbol("C1p", positive=True)
    y_4_6 = (2 / C1p) * sp.cosh(C1p * x + C2)
    check_zero("7-review-4-6", y_4_6 * sp.diff(y_4_6, x, 2) - sp.diff(y_4_6, x) ** 2 - 4)

    # 4(7): y'' - 2y' + 2y = cos(2x) -> e^x(C1 cos x + C2 sin x) - (1/10)cos(2x) - (1/5)sin(2x)
    y_4_7 = sp.exp(x) * (C1 * sp.cos(x) + C2 * sp.sin(x)) - sp.Rational(1, 10) * sp.cos(2 * x) - sp.Rational(1, 5) * sp.sin(2 * x)
    check_zero("7-review-4-7", sp.diff(y_4_7, x, 2) - 2 * sp.diff(y_4_7, x) + 2 * y_4_7 - sp.cos(2 * x))

    # 4(8): y''' - y'' - 2y' = x*(e^(-x) + 2)
    # Solve particular solution cleanly:
    A1, B1, A2, B2 = sp.symbols("A1 B1 A2 B2")
    yp1 = x * (A1 * x + B1) * sp.exp(-x)
    eq1 = sp.expand((sp.diff(yp1, x, 3) - sp.diff(yp1, x, 2) - 2 * sp.diff(yp1, x)) * sp.exp(x) - x)
    sol1 = sp.solve([eq1.coeff(x, 1), eq1.coeff(x, 0)], [A1, B1])
    yp2 = x * (A2 * x + B2)
    eq2 = sp.expand(sp.diff(yp2, x, 3) - sp.diff(yp2, x, 2) - 2 * sp.diff(yp2, x) - 2 * x)
    sol2 = sp.solve([eq2.coeff(x, 1), eq2.coeff(x, 0)], [A2, B2])
    print("4(8) coeffs:", sol1, sol2)
    y_4_8 = (
        C1 + C2 * sp.exp(2 * x) + C3 * sp.exp(-x)
        + (sp.Rational(1, 6) * x**2 + sp.Rational(4, 9) * x) * sp.exp(-x)
        - sp.Rational(1, 2) * x**2 + sp.Rational(1, 2) * x
    )
    check_zero("7-review-4-8", sp.diff(y_4_8, x, 3) - sp.diff(y_4_8, x, 2) - 2 * sp.diff(y_4_8, x) - x * (sp.exp(-x) + 2))

    # 4(9): (y^3 - 2x^2)dy + x*y*dx = 0 -> x^2 = 2y^3 + C*y^4
    x_4_9 = sp.sqrt(2 * yp**3 + C * yp**4)
    check_zero("7-review-4-9", (yp**3 - 2 * x_4_9**2) + x_4_9 * yp * sp.diff(x_4_9, yp))

    # 4(10): y' + 3x = 3*sqrt(x^2 + y) -> (sqrt(x^2+y) - x)^2 = C*(2*sqrt(x^2+y) - x)
    u = sp.sqrt(x**2 + yp)
    F_4_10 = (u - x) ** 2 / (2 * u - x) - C
    dy_dx_4_10 = -sp.diff(F_4_10, x) / sp.diff(F_4_10, yp)
    check_zero("7-review-4-10", dy_dx_4_10 + 3 * x - 3 * u)

    # 5(1): y^4 dx + (3x^2 - 3x*y^3) dy = 0, y(1)=1 -> y^3 = x*(3*ln|y| + 1)
    x_5_1 = yp**3 / (3 * sp.log(yp) + 1)
    check_zero("7-review-5-1-ode", yp**4 * sp.diff(x_5_1, yp) + (3 * x_5_1**2 - 3 * x_5_1 * yp**3))
    check_zero("7-review-5-1-ivp", x_5_1.subs(yp, 1) - 1)

    # 5(2): y'' - k*(y')^2 = 0, y(0)=1, y'(0)=-2 -> y = 1 - (1/k)*ln(2kx + 1)
    y_5_2 = 1 - sp.log(2 * kp * x + 1) / kp
    check_zero("7-review-5-2-ode", sp.diff(y_5_2, x, 2) - kp * sp.diff(y_5_2, x) ** 2)
    check_zero("7-review-5-2-ivp0", y_5_2.subs(x, 0) - 1)
    check_zero("7-review-5-2-ivp1", sp.diff(y_5_2, x).subs(x, 0) + 2)

    # 5(3): y'' - 2*sin(2y) = 0, y(0)=pi/2, y'(0)=2 -> y = 2*atan(e^(2x))
    y_5_3 = 2 * sp.atan(sp.exp(2 * x))
    check_zero("7-review-5-3-ode", sp.diff(y_5_3, x, 2) - 2 * sp.sin(2 * y_5_3))
    check_zero("7-review-5-3-ivp0", y_5_3.subs(x, 0) - sp.pi / 2)
    check_zero("7-review-5-3-ivp1", sp.diff(y_5_3, x).subs(x, 0) - 2)

    # 5(4): y'' - 2y' + y = sin(x), y(0)=1/2, y'(0)=1 -> y = x*e^x + (1/2)*cos(x)
    y_5_4 = x * sp.exp(x) + sp.Rational(1, 2) * sp.cos(x)
    check_zero("7-review-5-4-ode", sp.diff(y_5_4, x, 2) - 2 * sp.diff(y_5_4, x) + y_5_4 - sp.sin(x))
    check_zero("7-review-5-4-ivp0", y_5_4.subs(x, 0) - sp.Rational(1, 2))
    check_zero("7-review-5-4-ivp1", sp.diff(y_5_4, x).subs(x, 0) - 1)

    # 6: curve through (1,2), y-intercept of tangent y - x*y' = 2x^2 -> y = 4x - 2x^2
    y_6 = 4 * x - 2 * x**2
    check_zero("7-review-6-ode", y_6 - x * sp.diff(y_6, x) - 2 * x**2)
    check_zero("7-review-6-ivp", y_6.subs(x, 1) - 2)

    # 7: 3000 dx/dt = v*(0.0003 - x), x(0)=0.0015, x(20)=0.0006 -> v = 300*ln(2)
    c_7 = sp.Rational(3, 10000) + sp.Rational(12, 10000) * sp.exp(-v * t / 3000)
    check_zero("7-review-7-ode", 3000 * sp.diff(c_7, t) - v * (sp.Rational(3, 10000) - c_7))
    check_zero("7-review-7-ivp", c_7.subs(t, 0) - sp.Rational(15, 10000))
    check_zero("7-review-7-target", c_7.subs({t: 20, v: 300 * sp.log(2)}) - sp.Rational(6, 10000))

    # 8: phi(x)*sin(x) - 2*int_{pi/2}^x phi(t)*cos(t) dt = x - pi/2 + 1 -> phi(x) = sin(x) - cos(x)
    phi_8 = sp.sin(x) - sp.cos(x)
    lhs_8 = phi_8 * sp.sin(x) - 2 * sp.integrate((sp.sin(t) - sp.cos(t)) * sp.cos(t), (t, sp.pi / 2, x))
    check_zero("7-review-8", lhs_8 - (x - sp.pi / 2 + 1))

    # 9: arc length on [0,x] is (1/2)*(e^(2x) - 1), y(0)=0, y>0 for x>0
    # y = (1/2)*sqrt(e^(4x) - 1) - (1/2)*atan(sqrt(e^(4x) - 1))
    u_9 = sp.sqrt(sp.exp(4 * xp) - 1)
    y_9 = sp.Rational(1, 2) * (u_9 - sp.atan(u_9))
    dy_9 = sp.simplify(sp.diff(y_9, xp))
    check_zero("7-review-9-arc", sp.simplify(sp.sqrt(1 + dy_9**2)) - sp.exp(2 * xp))
    check_zero("7-review-9-ivp", sp.limit(y_9, xp, 0, "+"))

    # 10(1) & 10(2): Wronskian W' + a(x)W = 0 and Liouville formula
    y1_fn = sp.Function("y1")(x)
    y2_fn = sp.Function("y2")(x)
    b_fn2 = sp.Function("b")(x)
    W_10 = y1_fn * sp.diff(y2_fn, x) - sp.diff(y1_fn, x) * y2_fn
    dW_10 = sp.diff(W_10, x).subs({
        sp.diff(y1_fn, x, 2): -a_fn * sp.diff(y1_fn, x) - b_fn2 * y1_fn,
        sp.diff(y2_fn, x, 2): -a_fn * sp.diff(y2_fn, x) - b_fn2 * y2_fn,
    })
    check_zero("7-review-10-1", dW_10 + a_fn * W_10)
    x0, W0 = sp.symbols("x0 W0")
    W_liouv = W0 * sp.exp(-sp.Integral(sp.Function("a")(t), (t, x0, x)))
    check_zero("7-review-10-2-ode", sp.diff(W_liouv, x) + sp.Function("a")(x) * W_liouv)
    check_zero("7-review-10-2-ivp", W_liouv.subs(x, x0) - W0)

    # 11(1): x^2 y'' - 3x y' + 4y = 0 -> x^2*(C1 + C2*ln(x))
    y_11_1 = xp**2 * (C1 + C2 * sp.log(xp))
    check_zero("7-review-11-1", xp**2 * sp.diff(y_11_1, xp, 2) - 3 * xp * sp.diff(y_11_1, xp) + 4 * y_11_1)

    # 11(2): x^2 y'' - 3x y' + 3y = 2x^2 -> C1*x + C2*x^3 - 2x^2
    y_11_2 = C1 * xp + C2 * xp**3 - 2 * xp**2
    check_zero("7-review-11-2", xp**2 * sp.diff(y_11_2, xp, 2) - 3 * xp * sp.diff(y_11_2, xp) + 3 * y_11_2 - 2 * xp**2)

    # 12(1): x' + y' + y = 0; -x + y' - 3y = t
    x_12_1 = (C1 + C2 * t) * sp.exp(t) - t - 3
    y_12_1 = sp.simplify((-t - x_12_1 - sp.diff(x_12_1, t)) / 4)
    print("12(1) y =", y_12_1)
    check_zero("7-review-12-1-eq1", sp.diff(x_12_1, t) + sp.diff(y_12_1, t) + y_12_1)
    check_zero("7-review-12-1-eq2", -x_12_1 + sp.diff(y_12_1, t) - 3 * y_12_1 - t)

    # 12(2): (D-1)^2 x + (D-1) y = 0; (D-1) x + (D-1)^2 y = e^(-t)
    # Eliminate y: [(D-1)^4 - (D-1)^2] x = -(D-1) e^(-t) => [(D-1)^3 - (D-1)] x = -e^(-t)
    # Char eq: (r-1)r(r-2) = 0 -> r=0,1,2. Particular: A e^(-t) -> ((-2)^3 - (-2))A = -6A = -1 -> A = 1/6
    x_12_2 = C1 + C2 * sp.exp(t) + C3 * sp.exp(2 * t) + sp.Rational(1, 6) * sp.exp(-t)
    y_12_2 = C1 + C4 * sp.exp(t) - C3 * sp.exp(2 * t) + sp.Rational(1, 3) * sp.exp(-t)
    eq1_12_2 = sp.diff(x_12_2, t, 2) - 2 * sp.diff(x_12_2, t) + x_12_2 + sp.diff(y_12_2, t) - y_12_2
    eq2_12_2 = sp.diff(x_12_2, t) - x_12_2 + sp.diff(y_12_2, t, 2) - 2 * sp.diff(y_12_2, t) + y_12_2 - sp.exp(-t)
    check_zero("7-review-12-2-eq1", eq1_12_2)
    check_zero("7-review-12-2-eq2", eq2_12_2)

    print("\nALL 29 SYMBOLIC CHECKS PASSED!")


if __name__ == "__main__":
    main()
