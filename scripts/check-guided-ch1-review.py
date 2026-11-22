"""SymPy step-chain verifier for ch1Review guidedHints (35 problems)."""

import time
import sympy as sp

x, u, a, theta, k_slope, b_int = sp.symbols("x u a theta k_slope b_int", real=True)
x_pos = sp.Symbol("x_pos", real=True, positive=True)
u_pos = sp.Symbol("u_pos", real=True, positive=True)
n = sp.Symbol("n", integer=True, positive=True)
k = sp.Symbol("k", integer=True, positive=True)
m = sp.Symbol("m", integer=True)


def assert_eq_expr(pid: str, step: str, e1, e2) -> None:
    diff = sp.simplify(e1 - e2)
    if diff != 0:
        raise AssertionError(f"[{pid}] {step}: {e1} != {e2} (diff={diff})")


def assert_equiv_infinitesimal(pid: str, step: str, e1, e2, var, pt) -> None:
    ratio = sp.limit(e1 / e2, var, pt)
    if sp.simplify(ratio - 1) != 0:
        raise AssertionError(f"[{pid}] {step}: limit({e1}/{e2}) = {ratio} != 1")


def assert_limit(pid: str, expr, var, pt, expected, dir_str="+-") -> None:
    if pt in (sp.oo, -sp.oo):
        got = sp.limit(expr, var, pt)
    else:
        got = sp.limit(expr, var, pt, dir=dir_str)
    if expected in (sp.oo, -sp.oo):
        if got != expected:
            raise AssertionError(f"[{pid}] limit({expr}, {var}->{pt}{dir_str}) = {got} != {expected}")
    elif sp.simplify(got - expected) != 0:
        raise AssertionError(f"[{pid}] limit({expr}, {var}->{pt}{dir_str}) = {got} != {expected}")


def assert_denom_nonzero(pid: str, expr, var, pt) -> None:
    _, denom = sp.fraction(sp.together(expr))
    val = denom.subs(var, pt)
    if sp.simplify(val) == 0:
        raise AssertionError(f"[{pid}] final denominator is 0 at {var}={pt} for {expr}")


def verify_all() -> int:
    checked = 0

    # jc935-1-review-1-1: counterexample a_n = 3*(-1)^n
    a_even = 3 * (-1) ** (2 * k)
    a_odd = 3 * (-1) ** (2 * k - 1)
    assert sp.simplify(a_even - 3) == 0
    assert sp.simplify(a_odd + 3) == 0
    assert abs(3) <= 4
    checked += 1

    # jc935-1-review-1-2: counterexample f(x) = sin(1/(x-2))
    f12 = sp.sin(1 / (x - 2))
    xk = 2 + 1 / (sp.pi / 2 + 2 * k * sp.pi)
    yk = 2 + 1 / (3 * sp.pi / 2 + 2 * k * sp.pi)
    assert_limit("jc935-1-review-1-2", xk, k, sp.oo, 2)
    assert_limit("jc935-1-review-1-2", yk, k, sp.oo, 2)
    assert sp.simplify(f12.subs(x, xk) - 1) == 0
    assert sp.simplify(f12.subs(x, yk) + 1) == 0
    checked += 1

    # jc935-1-review-1-3: counterexample f(x) = sin(1/(x-3))/(x-3)
    f13 = sp.sin(1 / (x - 3)) / (x - 3)
    xk3 = 3 + 1 / (2 * k * sp.pi + sp.pi / 2)
    yk3 = 3 + 1 / (k * sp.pi)
    assert_limit("jc935-1-review-1-3", xk3, k, sp.oo, 3)
    assert_limit("jc935-1-review-1-3", yk3, k, sp.oo, 3)
    assert_eq_expr("jc935-1-review-1-3", "peak_val", f13.subs(x, xk3), 2 * k * sp.pi + sp.pi / 2)
    assert_limit("jc935-1-review-1-3", f13.subs(x, xk3), k, sp.oo, sp.oo)
    assert sp.simplify(f13.subs(x, yk3)) == 0
    checked += 1

    # jc935-1-review-2: lim_{x->0} (cos(2x))^(-3x^2) = 1
    e0 = sp.cos(2 * x) ** (-3 * x**2)
    exp_part = -3 * x**2 * sp.log(sp.cos(2 * x))
    e1 = sp.exp(exp_part)
    # Check numeric equality on punctured neighborhood 0 < |x| < pi/4
    for pt in (0.1, -0.2, 0.35):
        assert abs(float(e0.subs(x, pt)) - float(e1.subs(x, pt))) < 1e-12
    assert_limit("jc935-1-review-2", exp_part, x, 0, 0)
    assert_limit("jc935-1-review-2", e0, x, 0, 1)
    checked += 1

    # jc935-1-review-3-1: lim_{x->0} (4^x + 5^x - 2)/x = ln(20)
    e0 = (4**x + 5**x - 2) / x
    e1 = (4**x - 1) / x + (5**x - 1) / x
    assert_eq_expr("jc935-1-review-3-1", "split", e0, e1)
    assert_limit("jc935-1-review-3-1", (4**x - 1) / x, x, 0, sp.log(4))
    assert_limit("jc935-1-review-3-1", (5**x - 1) / x, x, 0, sp.log(5))
    assert_limit("jc935-1-review-3-1", e0, x, 0, sp.log(20))
    assert sp.simplify(sp.log(4) + sp.log(5) - sp.log(20)) == 0
    assert sp.N(sp.log(20)) != 1
    checked += 1

    # jc935-1-review-3-2: f(x) = (e^(2/x) - 3)/(e^(2/x) + 3)
    e0 = (sp.exp(2 / x) - 3) / (sp.exp(2 / x) + 3)
    e1 = (1 - 3 * sp.exp(-2 / x)) / (1 + 3 * sp.exp(-2 / x))
    assert_eq_expr("jc935-1-review-3-2", "div_exp", e0, e1)
    assert_limit("jc935-1-review-3-2", e0, x, 0, -1, dir_str="-")
    assert_limit("jc935-1-review-3-2", e1, x, 0, 1, dir_str="+")
    assert_denom_nonzero("jc935-1-review-3-2", (1 - 3 * u) / (1 + 3 * u), u, 0)
    checked += 1

    # jc935-1-review-4-1: 0 <= 2^x <= 4 -> x <= 2
    sol41 = sp.reduce_inequalities([2**x >= 0, 2**x <= 4], x)
    assert sol41.as_set() == sp.Interval(-sp.oo, 2)
    checked += 1

    # jc935-1-review-4-2: -1 <= ln(x) <= 2 -> [1/e, e^2]
    sol42 = sp.reduce_inequalities([sp.log(x_pos) >= -1, sp.log(x_pos) <= 2], x_pos)
    assert sol42.as_set() == sp.Interval(sp.exp(-1), sp.exp(2))
    checked += 1

    # jc935-1-review-4-3: 0 <= arctan(x) <= pi/3 -> [0, sqrt(3)]
    assert sp.tan(0) == 0
    assert sp.tan(sp.pi / 3) == sp.sqrt(3)
    assert sp.atan(0) == 0
    assert sp.atan(sp.sqrt(3)) == sp.pi / 3
    checked += 1

    # jc935-1-review-4-4: -2 <= cos(2x) <= 0 -> [pi/4 + m*pi, 3*pi/4 + m*pi]
    assert sp.simplify(sp.cos(2 * (sp.pi / 4 + m * sp.pi))) == 0
    assert sp.simplify(sp.cos(2 * (3 * sp.pi / 4 + m * sp.pi))) == 0
    assert sp.simplify(sp.cos(2 * (sp.pi / 2 + m * sp.pi)) + 1) == 0
    checked += 1

    # jc935-1-review-5-1..5-4: f(x)=max(0,x-1), g(x)=-(max(0,x-1))^2
    def f_fn(v):
        return sp.Max(0, v - 1)

    def g_fn(v):
        return -(sp.Max(0, v - 1)) ** 2

    test_pts = (-3, -1, 0, 1, sp.Rational(3, 2), 2, 3, 5)
    for pt in test_pts:
        assert f_fn(f_fn(pt)) == sp.Max(0, pt - 2)
        assert g_fn(g_fn(pt)) == 0
        assert f_fn(g_fn(pt)) == 0
        assert g_fn(f_fn(pt)) == -(sp.Max(0, pt - 2)) ** 2
    assert g_fn(f_fn(3)) == -1 and f_fn(g_fn(3)) == 0
    checked += 4

    # jc935-1-review-6-1: g(x) = |sin(2x)|
    g61 = sp.Abs(sp.sin(2 * x))
    assert sp.simplify(g61.subs(x, m * sp.pi / 2)) == 0
    assert sp.simplify(g61.subs(x, sp.pi / 4 + m * sp.pi / 2) - 1) == 0
    assert sp.simplify(g61.subs(x, x + sp.pi / 2) - g61) == 0
    checked += 1

    # jc935-1-review-6-2: g(x) = sin(2|x|)
    g62 = sp.sin(2 * sp.Abs(x))
    assert sp.simplify(g62.subs(x, -x) - g62) == 0
    assert sp.simplify(g62.subs(x, 3 * sp.pi / 4) + 1) == 0
    checked += 1

    # jc935-1-review-6-3: g(x) = 3*sin(x/3)
    g63 = 3 * sp.sin(x / 3)
    assert sp.simplify(g63.subs(x, x + 6 * sp.pi) - g63) == 0
    assert g63.subs(x, 0) == 0
    assert g63.subs(x, 3 * sp.pi / 2) == 3
    assert g63.subs(x, 3 * sp.pi) == 0
    assert g63.subs(x, 9 * sp.pi / 2) == -3
    assert g63.subs(x, 6 * sp.pi) == 0
    checked += 1

    # jc935-1-review-7: cone from sector R=4, angle theta
    r_cone = 2 * theta / sp.pi
    assert_eq_expr("jc935-1-review-7", "arc_eq_circ", 2 * sp.pi * r_cone, 4 * theta)
    h_cone = sp.sqrt(16 - r_cone**2)
    v_cone = sp.pi * r_cone**2 * h_cone / 3
    expected_v = (4 * theta**2 / (3 * sp.pi)) * sp.sqrt(16 - 4 * theta**2 / sp.pi**2)
    assert_eq_expr("jc935-1-review-7", "volume", v_cone, expected_v)
    checked += 1

    # jc935-1-review-8: lim_{x->4} (x^2 - x - 12)/(x - 4) = 7
    e0 = (x**2 - x - 12) / (x - 4)
    e1 = (x - 4) * (x + 3) / (x - 4)
    e2 = x + 3
    assert_eq_expr("jc935-1-review-8", "factor", e0, e1)
    assert_eq_expr("jc935-1-review-8", "cancel", e1, e2)
    assert_eq_expr("jc935-1-review-8", "error", e2 - 7, x - 4)
    assert_denom_nonzero("jc935-1-review-8", e2, x, 4)
    assert_limit("jc935-1-review-8", e0, x, 4, 7)
    checked += 1

    # jc935-1-review-9-1: lim_{x->2} (x^2 - x + 2)/(x - 2)^2 = +oo
    num = x**2 - x + 2
    e0 = num / (x - 2) ** 2
    assert_limit("jc935-1-review-9-1", num, x, 2, 4)
    assert_limit("jc935-1-review-9-1", e0, x, 2, sp.oo, dir_str="+")
    assert_limit("jc935-1-review-9-1", e0, x, 2, sp.oo, dir_str="-")
    checked += 1

    # jc935-1-review-9-2: lim_{x->+oo} x*(sqrt(x^2+6) - x) = 3
    e0 = x_pos * (sp.sqrt(x_pos**2 + 6) - x_pos)
    e1 = x_pos * (sp.sqrt(x_pos**2 + 6) - x_pos) * (sp.sqrt(x_pos**2 + 6) + x_pos) / (sp.sqrt(x_pos**2 + 6) + x_pos)
    e2 = 6 * x_pos / (sp.sqrt(x_pos**2 + 6) + x_pos)
    e3 = 6 / (sp.sqrt(1 + 6 / x_pos**2) + 1)
    assert_eq_expr("jc935-1-review-9-2", "rationalize", e0, e1)
    assert_eq_expr("jc935-1-review-9-2", "diff_sq", e1, e2)
    assert_eq_expr("jc935-1-review-9-2", "div_x", e2, e3)
    assert_denom_nonzero("jc935-1-review-9-2", 6 / (sp.sqrt(1 + 6 * u**2) + 1), u, 0)
    assert_limit("jc935-1-review-9-2", e0, x_pos, sp.oo, 3)
    checked += 1

    # jc935-1-review-9-3: lim_{x->+oo} ((x+5)/(x+2))^(x+3) = e^3
    base0 = (x + 5) / (x + 2)
    base1 = 1 + 3 / (x + 2)
    assert_eq_expr("jc935-1-review-9-3", "base_split", base0, base1)
    u_expr = 3 / (x + 2)
    exp_out = u_expr * (x + 3)
    exp_div = 3 * (1 + 3 / x) / (1 + 2 / x)
    assert_eq_expr("jc935-1-review-9-3", "exp_div", exp_out, exp_div)
    assert_limit("jc935-1-review-9-3", exp_out, x, sp.oo, 3)
    assert_limit("jc935-1-review-9-3", base0 ** (x + 3), x, sp.oo, sp.exp(3))
    checked += 1

    # jc935-1-review-9-4: lim_{x->0} (tan(3x) - sin(3x))/x^3 = 27/2
    e0 = (sp.tan(3 * x) - sp.sin(3 * x)) / x**3
    e1 = sp.sin(3 * x) * (1 - sp.cos(3 * x)) / (x**3 * sp.cos(3 * x))
    e2 = (3 * x) * (sp.Rational(9, 2) * x**2) / (x**3 * sp.cos(3 * x))
    e3 = sp.Rational(27, 2) / sp.cos(3 * x)
    assert_eq_expr("jc935-1-review-9-4", "factor_sin", e0, e1)
    assert_equiv_infinitesimal("jc935-1-review-9-4", "sin3x", sp.sin(3 * x), 3 * x, x, 0)
    assert_equiv_infinitesimal("jc935-1-review-9-4", "1-cos3x", 1 - sp.cos(3 * x), sp.Rational(9, 2) * x**2, x, 0)
    assert_eq_expr("jc935-1-review-9-4", "cancel_x3", e2, e3)
    assert_denom_nonzero("jc935-1-review-9-4", e3, x, 0)
    assert_limit("jc935-1-review-9-4", e0, x, 0, sp.Rational(27, 2))
    checked += 1

    # jc935-1-review-9-5: lim_{x->0} ((2^x + 5^x + 20^x)/3)^(1/x) = 200^(1/3)
    base = (2**x + 5**x + 20**x) / 3
    u5 = ((2**x - 1) + (5**x - 1) + (20**x - 1)) / 3
    assert_eq_expr("jc935-1-review-9-5", "u_def", base - 1, u5)
    assert_limit("jc935-1-review-9-5", u5 / x, x, 0, sp.log(200) / 3)
    assert_limit("jc935-1-review-9-5", sp.log(base) / x, x, 0, sp.log(200) / 3)
    assert_limit("jc935-1-review-9-5", base ** (1 / x), x, 0, sp.cbrt(200))
    checked += 1

    # jc935-1-review-9-6: lim_{x->0} (cos x)^(cot x) = 1
    exp6 = sp.cot(x) * sp.log(sp.cos(x))
    assert_equiv_infinitesimal("jc935-1-review-9-6", "ln_cos", sp.log(sp.cos(x)), -(x**2) / 2, x, 0)
    assert_equiv_infinitesimal("jc935-1-review-9-6", "sin_x", sp.sin(x), x, x, 0)
    e2 = sp.cos(x) * (-(x**2) / 2) / x
    e3 = -x * sp.cos(x) / 2
    assert_eq_expr("jc935-1-review-9-6", "cancel_x", e2, e3)
    assert_limit("jc935-1-review-9-6", exp6, x, 0, 0)
    assert_limit("jc935-1-review-9-6", sp.cos(x) ** sp.cot(x), x, 0, 1)
    checked += 1

    # jc935-1-review-9-7: lim_{x->4} (ln x - ln 4)/(x - 4) = 1/4
    e0 = (sp.log(x_pos) - sp.log(4)) / (x_pos - 4)
    e1 = sp.log(x_pos / 4) / (x_pos - 4)
    assert_eq_expr("jc935-1-review-9-7", "log_sub", e0, e1)
    e_u = sp.log(1 + u) / (4 * u)
    assert_eq_expr("jc935-1-review-9-7", "subst_u", e1.subs(x_pos, 4 + 4 * u), e_u)
    assert_limit("jc935-1-review-9-7", e_u, u, 0, sp.Rational(1, 4))
    assert_limit("jc935-1-review-9-7", e0, x_pos, 4, sp.Rational(1, 4))
    checked += 1

    # jc935-1-review-9-8: lim_{x->0} x*tan(2x)/(sqrt(1-3x^2) - 1) = -4/3
    e0 = x * sp.tan(2 * x) / (sp.sqrt(1 - 3 * x**2) - 1)
    e1 = x * sp.tan(2 * x) * (sp.sqrt(1 - 3 * x**2) + 1) / (-3 * x**2)
    e2 = x * (2 * x) * (sp.sqrt(1 - 3 * x**2) + 1) / (-3 * x**2)
    e3 = 2 * (sp.sqrt(1 - 3 * x**2) + 1) / (-3)
    assert_eq_expr("jc935-1-review-9-8", "rationalize", e0, e1)
    assert_equiv_infinitesimal("jc935-1-review-9-8", "tan2x", sp.tan(2 * x), 2 * x, x, 0)
    assert_eq_expr("jc935-1-review-9-8", "cancel_x2", e2, e3)
    assert_denom_nonzero("jc935-1-review-9-8", e3, x, 0)
    assert_limit("jc935-1-review-9-8", e0, x, 0, -sp.Rational(4, 3))
    checked += 1

    # jc935-1-review-10: u=x-2, a+u^2 (u<=0), 3u*cos(1/u) (u>0) -> a = 0
    assert_limit("jc935-1-review-10", a + u**2, u, 0, a, dir_str="-")
    assert_limit("jc935-1-review-10", 3 * u_pos, u_pos, 0, 0, dir_str="+")
    checked += 1

    # jc935-1-review-11: G(x) = lim_{n->oo} (2+x)/(1+(x/2)^(2n))
    assert_limit("jc935-1-review-11", (2 + sp.Integer(1)) / (1 + sp.Rational(1, 2) ** (2 * n)), n, sp.oo, 3)
    assert_limit("jc935-1-review-11", (2 + sp.Integer(2)) / (1 + sp.Integer(1) ** (2 * n)), n, sp.oo, 2)
    assert_limit("jc935-1-review-11", (2 - sp.Integer(2)) / (1 + sp.Integer(1) ** (2 * n)), n, sp.oo, 0)
    assert_limit("jc935-1-review-11", (2 + sp.Integer(3)) / (1 + sp.Rational(3, 2) ** (2 * n)), n, sp.oo, 0)
    assert_limit("jc935-1-review-11", 2 + x, x, -2, 0, dir_str="+")
    assert_limit("jc935-1-review-11", 2 + x, x, 2, 4, dir_str="-")
    checked += 1

    # jc935-1-review-12: S_n = sum_{k=1}^n 1/sqrt(n^2+3k) -> 1
    low0 = n / sp.sqrt(n**2 + 3 * n)
    low1 = 1 / sp.sqrt(1 + 3 / n)
    assert_eq_expr("jc935-1-review-12", "div_n", low0, low1)
    assert_limit("jc935-1-review-12", low1, n, sp.oo, 1)
    for nv in range(1, 8):
        s_val = sum(1 / sp.sqrt(nv**2 + 3 * kv) for kv in range(1, nv + 1))
        assert float(low1.subs(n, nv)) <= float(s_val) <= 1.0
    checked += 1

    # jc935-1-review-13: F(x) = 2*sin(x) + x - 1 on [-pi/2, pi/2]
    F13 = 2 * sp.sin(x) + x - 1
    assert sp.simplify(F13.subs(x, -sp.pi / 2) - (-3 - sp.pi / 2)) == 0
    assert sp.simplify(F13.subs(x, sp.pi / 2) - (1 + sp.pi / 2)) == 0
    assert float(F13.subs(x, -sp.pi / 2)) < 0
    assert float(F13.subs(x, sp.pi / 2)) > 0
    checked += 1

    # jc935-1-review-14-1: algebraic identity (f - kx)/x == f/x - k
    f_sym = sp.Function("f")(x)
    assert_eq_expr("jc935-1-review-14-1", "slope_identity", (f_sym - k_slope * x) / x, f_sym / x - k_slope)
    checked += 1

    # jc935-1-review-14-2: f(x) = (3x - 2)*e^(2/x), oblique asymptote y = 3x + 4
    f142 = (3 * x - 2) * sp.exp(2 / x)
    q1 = f142 / x
    q2 = (3 - 2 / x) * sp.exp(2 / x)
    assert_eq_expr("jc935-1-review-14-2", "div_x", q1, q2)
    assert_limit("jc935-1-review-14-2", q1, x, sp.oo, 3)
    diff0 = f142 - 3 * x
    diff1 = 3 * x * (sp.exp(2 / x) - 1) - 2 * sp.exp(2 / x)
    assert_eq_expr("jc935-1-review-14-2", "split_b", diff0, diff1)
    diff_u = 6 * (sp.exp(u) - 1) / u - 2 * sp.exp(u)
    assert_eq_expr("jc935-1-review-14-2", "subst_u", diff1.subs(x, 2 / u), diff_u)
    assert_limit("jc935-1-review-14-2", diff_u, u, 0, 4)
    assert_limit("jc935-1-review-14-2", diff0, x, sp.oo, 4)
    checked += 1

    # jc935-1-review-14-3: f(x) = x*ln(3 + 2/x)
    f143 = x * sp.log(3 + 2 / x)
    assert_limit("jc935-1-review-14-3", f143, x, -sp.Rational(2, 3), sp.oo, dir_str="-")
    assert_limit("jc935-1-review-14-3", f143, x, 0, 0, dir_str="+")
    assert_limit("jc935-1-review-14-3", f143 / x, x, sp.oo, sp.log(3))
    assert_limit("jc935-1-review-14-3", f143 / x, x, -sp.oo, sp.log(3))
    b_expr = f143 - x * sp.log(3)
    b_simp = x * sp.log(1 + 2 / (3 * x))
    for pt in (10, 50, -10, -50):
        assert abs(float(b_expr.subs(x, pt)) - float(b_simp.subs(x, pt))) < 1e-12
    assert_limit("jc935-1-review-14-3", b_expr, x, sp.oo, sp.Rational(2, 3))
    assert_limit("jc935-1-review-14-3", b_expr, x, -sp.oo, sp.Rational(2, 3))
    checked += 1

    return checked


if __name__ == "__main__":
    t0 = time.perf_counter()
    count = verify_all()
    dt = time.perf_counter() - t0
    print(f"OK: verified {count} problems in ch1Review in {dt:.2f}s")
