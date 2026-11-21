#!/usr/bin/env python3
"""Symbolic verification for Section exam-4 (Differential Equations)."""

import sympy as sp

x, y, t, u, r, a, m, n = sp.symbols("x y t u r a m n", real=True)
x_pos = sp.symbols("x_pos", positive=True)
T_pos = sp.symbols("T_pos", positive=True)
C1, C2, C3, C = sp.symbols("C1 C2 C3 C", real=True)


def check_zero(name: str, expr):
    simplified = sp.simplify(sp.expand(expr.rewrite(sp.exp)))
    assert simplified == 0, f"{name} failed: got {simplified}"


def main():
    # Q1: y'' - 4y' + 13y = 0 => y = e^{2x}(C1 cos 3x + C2 sin 3x)
    y1 = sp.exp(2 * x) * (C1 * sp.cos(3 * x) + C2 * sp.sin(3 * x))
    check_zero("jc935-exam-4-1", sp.diff(y1, x, 2) - 4 * sp.diff(y1, x) + 13 * y1)

    # Q2: y'' + 2y' + 10y = e^{-x}(2 + sin 3x), trial y* = A e^{-x} + x e^{-x}(B cos 3x + C sin 3x)
    A, B, D = sp.symbols("A B D", real=True)
    y2_star = A * sp.exp(-x) + x * sp.exp(-x) * (B * sp.cos(3 * x) + D * sp.sin(3 * x))
    lhs2 = sp.expand((sp.diff(y2_star, x, 2) + 2 * sp.diff(y2_star, x) + 10 * y2_star) * sp.exp(x))
    rhs2 = 2 + sp.sin(3 * x)
    sol2 = sp.solve(
        [
            sp.simplify(lhs2 - rhs2).subs({sp.cos(3 * x): 0, sp.sin(3 * x): 0}),
            sp.Poly(lhs2 - rhs2, sp.cos(3 * x), sp.sin(3 * x)).coeff_monomial(sp.cos(3 * x)),
            sp.Poly(lhs2 - rhs2, sp.cos(3 * x), sp.sin(3 * x)).coeff_monomial(sp.sin(3 * x)),
        ],
        [A, B, D],
    )
    assert sol2 == {A: sp.Rational(2, 9), B: sp.Rational(-1, 6), D: 0}, f"jc935-exam-4-2 failed: {sol2}"

    # Q3: y y'' + 2(y')^2 = 0, y(0)=1, y'(0)=1 => y = (3x + 1)^{1/3}
    y3 = sp.cbrt(3 * x + 1)
    check_zero("jc935-exam-4-3 ODE", y3 * sp.diff(y3, x, 2) + 2 * sp.diff(y3, x) ** 2)
    check_zero("jc935-exam-4-3 y(0)", y3.subs(x, 0) - 1)
    check_zero("jc935-exam-4-3 y'(0)", sp.diff(y3, x).subs(x, 0) - 1)

    # Q4: x^2 y'' - 2x y' - 4y = 0 (x > 0) => y = C1 x^4 + C2 / x
    y4 = C1 * x_pos**4 + C2 / x_pos
    check_zero("jc935-exam-4-4", x_pos**2 * sp.diff(y4, x_pos, 2) - 2 * x_pos * sp.diff(y4, x_pos) - 4 * y4)

    # Q5: (2y + x^4)dx - x dy = 0, y(1)=3/2 => y = x^4/2 + x^2
    y5 = sp.Rational(1, 2) * x**4 + x**2
    check_zero("jc935-exam-4-5 ODE", (2 * y5 + x**4) - x * sp.diff(y5, x))
    check_zero("jc935-exam-4-5 IVP", y5.subs(x, 1) - sp.Rational(3, 2))

    # Q6: hom gen sol (C1 + C2 x)e^{-2x} => y'' + 4y' + 4y = 0; solve y'' + 4y' + 4y = 4x, y(0)=1, y'(0)=0
    y6_h = (C1 + C2 * x) * sp.exp(-2 * x)
    check_zero("jc935-exam-4-6 hom", sp.diff(y6_h, x, 2) + 4 * sp.diff(y6_h, x) + 4 * y6_h)
    y6 = (2 + 3 * x) * sp.exp(-2 * x) + x - 1
    check_zero("jc935-exam-4-6 nonhom", sp.diff(y6, x, 2) + 4 * sp.diff(y6, x) + 4 * y6 - 4 * x)
    check_zero("jc935-exam-4-6 y(0)", y6.subs(x, 0) - 1)
    check_zero("jc935-exam-4-6 y'(0)", sp.diff(y6, x).subs(x, 0) - 0)

    # Q7: y = C1 e^{-2x} + C2 cos 3x + C3 sin 3x => y''' + 2y'' + 9y' + 18y = 0
    y7 = C1 * sp.exp(-2 * x) + C2 * sp.cos(3 * x) + C3 * sp.sin(3 * x)
    check_zero(
        "jc935-exam-4-7",
        sp.diff(y7, x, 3) + 2 * sp.diff(y7, x, 2) + 9 * sp.diff(y7, x) + 18 * y7,
    )

    # Q8: 2y y' - 2y^2 - 6 = 0, y(0)=1 => y = sqrt(4 e^{2x} - 3)
    y8 = sp.sqrt(4 * sp.exp(2 * x) - 3)
    check_zero("jc935-exam-4-8 ODE", 2 * y8 * sp.diff(y8, x) - 2 * y8**2 - 6)
    check_zero("jc935-exam-4-8 IVP", y8.subs(x, 0) - 1)

    # Q9: f'' + a f' + 2 f = 0 (a>0), f(0)=m, f'(0)=n => int_0^oo f(x) dx = (a m + n)/2
    # Verify explicitly for overdamped (a=3), critically damped (a=2*sqrt(2)), and underdamped (a=2)
    f_sym = sp.Function("f")
    for a_val in [sp.Integer(3), 2 * sp.sqrt(2), sp.Integer(2)]:
        sol9 = sp.dsolve(
            sp.Eq(f_sym(x).diff(x, 2) + a_val * f_sym(x).diff(x) + 2 * f_sym(x), 0),
            ics={f_sym(0): m, f_sym(x).diff(x).subs(x, 0): n},
        ).rhs
        val9 = sp.integrate(sol9, (x, 0, sp.oo))
        check_zero(f"jc935-exam-4-9 a={a_val}", val9 - (a_val * m + n) / 2)

    # Q10: y'' + 4y' + 4y = 0, y(0)=1, y'(0)=2 => int_0^oo y(x) dx = 3/2
    y10 = (1 + 4 * x) * sp.exp(-2 * x)
    check_zero("jc935-exam-4-10 ODE", sp.diff(y10, x, 2) + 4 * sp.diff(y10, x) + 4 * y10)
    check_zero("jc935-exam-4-10 y(0)", y10.subs(x, 0) - 1)
    check_zero("jc935-exam-4-10 y'(0)", sp.diff(y10, x).subs(x, 0) - 2)
    check_zero("jc935-exam-4-10 integral", sp.integrate(y10, (x, 0, sp.oo)) - sp.Rational(3, 2))

    # Q11: y''' + 8y = 0 => y = C1 e^{-2x} + e^x(C2 cos(sqrt(3)x) + C3 sin(sqrt(3)x))
    y11 = C1 * sp.exp(-2 * x) + sp.exp(x) * (C2 * sp.cos(sp.sqrt(3) * x) + C3 * sp.sin(sp.sqrt(3) * x))
    check_zero("jc935-exam-4-11", sp.diff(y11, x, 3) + 8 * y11)

    # Q12: x^2 y'' + x y' - 9y = 0, y(1)=2, y'(1)=0 => y = x^3 + 1/x^3
    y12 = x_pos**3 + x_pos ** (-3)
    check_zero("jc935-exam-4-12 ODE", x_pos**2 * sp.diff(y12, x_pos, 2) + x_pos * sp.diff(y12, x_pos) - 9 * y12)
    check_zero("jc935-exam-4-12 y(1)", y12.subs(x_pos, 1) - 2)
    check_zero("jc935-exam-4-12 y'(1)", sp.diff(y12, x_pos).subs(x_pos, 1) - 0)

    # Q13: int_1^{xt} f(u) du = t int_1^x f(u) du + x int_1^t f(u) du, f(1)=3 => f(x) = 3(ln x + 1)
    t_pos = sp.symbols("t_pos", positive=True)
    f13 = 3 * (sp.log(u) + 1)
    lhs13 = sp.integrate(f13, (u, 1, x_pos * t_pos))
    rhs13 = t_pos * sp.integrate(f13, (u, 1, x_pos)) + x_pos * sp.integrate(f13, (u, 1, t_pos))
    check_zero("jc935-exam-4-13 functional eq", lhs13 - rhs13)
    check_zero("jc935-exam-4-13 f(1)", f13.subs(u, 1) - 3)

    # Q14(1): Y_Q = y + x/y' = -2y => 3y y' + x = 0, passes through (1/2, 1/2) => x^2 + 3y^2 = 1
    y14 = sp.sqrt((1 - x**2) / 3)
    yq14 = y14 + x / sp.diff(y14, x)
    check_zero("jc935-exam-4-14-1 normal condition", yq14 + 2 * y14)
    check_zero("jc935-exam-4-14-1 point", y14.subs(x, sp.Rational(1, 2)) - sp.Rational(1, 2))

    # Q14(2): s = (sqrt(3)/6) l where l = int_0^pi sqrt(1 + 2 cos^2 x) dx
    theta = sp.symbols("theta", real=True)
    ds_sq = sp.sin(theta) ** 2 + sp.Rational(1, 3) * sp.cos(theta) ** 2
    check_zero("jc935-exam-4-14-2 integrand", ds_sq - (1 + 2 * sp.sin(theta) ** 2) / 3)
    s_num = sp.N(sp.Integral(sp.sqrt(ds_sq), (theta, 0, sp.pi / 2)), 20)
    l_num = sp.N(sp.Integral(sp.sqrt(1 + 2 * sp.cos(x) ** 2), (x, 0, sp.pi)), 20)
    assert abs(s_num - (sp.sqrt(3) / 6) * l_num) < 1e-15, "jc935-exam-4-14-2 numerical check failed"

    # Q15(1) & Q15(2): d^2x/dy^2 + (4y + cos 2x)(dx/dy)^3 = 0 => y'' - 4y = cos 2x; IVP y(0)=7/8, y'(0)=2
    y15 = sp.exp(2 * x) - sp.Rational(1, 8) * sp.cos(2 * x)
    y15_p = sp.diff(y15, x)
    y15_pp = sp.diff(y15, x, 2)
    dx_dy = 1 / y15_p
    d2x_dy2 = -y15_pp / (y15_p**3)
    check_zero("jc935-exam-4-15-1 inverse ODE", d2x_dy2 + (4 * y15 + sp.cos(2 * x)) * dx_dy**3)
    check_zero("jc935-exam-4-15-2 linear ODE", y15_pp - 4 * y15 - sp.cos(2 * x))
    check_zero("jc935-exam-4-15-2 y(0)", y15.subs(x, 0) - sp.Rational(7, 8))
    check_zero("jc935-exam-4-15-2 y'(0)", y15_p.subs(x, 0) - 2)

    # Q16: m dv/dt = -k v, m=4000 kg, v0=50 m/s, k=2000 N*s/m => s = m v0 / k = 100 m
    m16, v0_16, k16 = 4000, 50, 2000
    v16 = v0_16 * sp.exp(-sp.Rational(k16, m16) * t)
    check_zero("jc935-exam-4-16 ODE", m16 * sp.diff(v16, t) + k16 * v16)
    s16 = sp.integrate(v16, (t, 0, sp.oo))
    check_zero("jc935-exam-4-16 distance", s16 - 100)

    # Q17(1) & Q17(2): a_0=5, a_1=2, 4 a_{n-2} - n(n-1)a_n = 0 => S'' - 4S = 0, S(x) = 3 e^{2x} + 2 e^{-2x}
    S17 = 3 * sp.exp(2 * x) + 2 * sp.exp(-2 * x)
    check_zero("jc935-exam-4-17-2 ODE", sp.diff(S17, x, 2) - 4 * S17)
    check_zero("jc935-exam-4-17-2 S(0)", S17.subs(x, 0) - 5)
    check_zero("jc935-exam-4-17-2 S'(0)", sp.diff(S17, x).subs(x, 0) - 2)
    # Auxiliary check for Q17(1): verify Taylor coefficients satisfy recurrence up to n=10
    coeffs = [sp.diff(S17, x, k).subs(x, 0) / sp.factorial(k) for k in range(11)]
    assert coeffs[0] == 5 and coeffs[1] == 2
    for k in range(2, 11):
        assert sp.simplify(4 * coeffs[k - 2] - k * (k - 1) * coeffs[k]) == 0

    # Q18: X_P + Y_P = 0 => (x + y y') + (y - x y') = 0, y(1)=0 => arctan(y/x) - (1/2)ln(x^2+y^2) = 0
    F18 = sp.atan(y / x_pos) - sp.Rational(1, 2) * sp.log(x_pos**2 + y**2)
    yp18 = sp.simplify(-sp.diff(F18, x_pos) / sp.diff(F18, y))
    check_zero("jc935-exam-4-18 ODE", (x_pos + y * yp18) + (y - x_pos * yp18))
    check_zero("jc935-exam-4-18 IVP", F18.subs({x_pos: 1, y: 0}))

    # Q19(1): y' + 2y = 4x => y = C e^{-2x} + 2x - 1
    y19 = C * sp.exp(-2 * x) + 2 * x - 1
    check_zero("jc935-exam-4-19-1", sp.diff(y19, x) + 2 * y19 - 4 * x)

    # Q19(2) auxiliary check: verify unique T-periodic constant C for f(x) = cos(2*pi*x/T)
    f_per = sp.cos(2 * sp.pi * t / T_pos)
    C_per = sp.integrate(f_per * sp.exp(2 * t), (t, 0, T_pos)) / (sp.exp(2 * T_pos) - 1)
    y_per = sp.exp(-2 * x) * (C_per + sp.integrate(f_per * sp.exp(2 * t), (t, 0, x)))
    check_zero("jc935-exam-4-19-2 periodic check", y_per.subs(x, x + T_pos) - y_per)

    # Q20(1): int_0^x f(t) dt + 2 int_0^x t f(x-t) dt = a x^2 => f(x) = a(1 - e^{-2x})
    f20 = a * (1 - sp.exp(-2 * t))
    lhs20 = sp.integrate(f20, (t, 0, x)) + 2 * sp.integrate(t * f20.subs(t, x - t), (t, 0, x))
    check_zero("jc935-exam-4-20-1", lhs20 - a * x**2)

    # Q20(2): average value of f(x) on [0,1] is 1 => a = 2 e^2 / (e^2 + 1)
    avg20 = sp.integrate(a * (1 - sp.exp(-2 * x)), (x, 0, 1))
    a_sol20 = sp.solve(sp.Eq(avg20, 1), a)[0]
    check_zero("jc935-exam-4-20-2", a_sol20 - 2 * sp.exp(2) / (sp.exp(2) + 1))

    print("All exam-4 symbolic checks passed (25 items: 23 symbolic + 2 proof auxiliary checks)!")


if __name__ == "__main__":
    main()
