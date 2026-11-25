"""SymPy step-chain verifier for ch1Core guidedHints (35 problems)."""

import math
import time
import sympy as sp

x, t, u, a, L = sp.symbols("x t u a L", real=True)
n = sp.Symbol("n", integer=True, positive=True)
k = sp.Symbol("k", integer=True, positive=True)


def assert_eq_expr(pid: str, step: str, e1, e2) -> None:
    diff = sp.simplify(e1 - e2)
    if diff != 0:
        raise AssertionError(f"[{pid}] {step}: {e1} != {e2} (diff={diff})")


def assert_equiv_infinitesimal(pid: str, step: str, e1, e2, var, pt) -> None:
    ratio = sp.limit(e1 / e2, var, pt)
    if sp.simplify(ratio - 1) != 0:
        raise AssertionError(f"[{pid}] {step}: limit({e1}/{e2}) = {ratio} != 1")


def assert_limit(pid: str, expr, var, pt, expected, dir_str="+-") -> None:
    got = sp.limit(expr, var, pt, dir=dir_str)
    if sp.simplify(got - expected) != 0:
        raise AssertionError(f"[{pid}] limit({expr}, {var}->{pt}{dir_str}) = {got} != {expected}")


def assert_denom_nonzero(pid: str, expr, var, pt) -> None:
    _, denom = sp.fraction(sp.together(expr))
    val = denom.subs(var, pt)
    if sp.simplify(val) == 0:
        raise AssertionError(f"[{pid}] final denominator is 0 at {var}={pt} for {expr}")


def verify_all() -> int:
    checked = 0

    # p1: lim_{x->1} (x^2-1)/(x-1) = 2
    e0 = (x**2 - 1) / (x - 1)
    e1 = (x - 1) * (x + 1) / (x - 1)
    e2 = x + 1
    assert_eq_expr("p1", "factor", e0, e1)
    assert_eq_expr("p1", "cancel", e1, e2)
    assert_denom_nonzero("p1", e2, x, 1)
    assert_limit("p1", e0, x, 1, 2)
    assert e2.subs(x, 1) == 2
    checked += 1

    # p2: lim_{x->2} (x^2+3x) = 10
    e0 = x**2 + 3 * x
    assert_denom_nonzero("p2", e0, x, 2)
    assert_limit("p2", e0, x, 2, 10)
    assert e0.subs(x, 2) == 10
    checked += 1

    # p3: lim_{x->0} sin(3x)/(5x) = 3/5
    e0 = sp.sin(3 * x) / (5 * x)
    e1 = sp.Rational(3, 5) * sp.sin(3 * x) / (3 * x)
    assert_eq_expr("p3", "scale", e0, e1)
    assert_limit("p3", e0, x, 0, sp.Rational(3, 5))
    assert_limit("p3", sp.Rational(3, 5) * sp.sin(t) / t, t, 0, sp.Rational(3, 5))
    checked += 1

    # p4: lim_{x->0} sin(2x)/(3x) = 2/3
    e0 = sp.sin(2 * x) / (3 * x)
    e1 = sp.Rational(2, 3) * sp.sin(2 * x) / (2 * x)
    assert_eq_expr("p4", "scale", e0, e1)
    assert_limit("p4", e0, x, 0, sp.Rational(2, 3))
    assert_limit("p4", sp.Rational(2, 3) * sp.sin(t) / t, t, 0, sp.Rational(2, 3))
    checked += 1

    # p5: f(x) = x+1 (x!=1), c (x=1) -> c = 2
    e0 = x + 1
    assert_denom_nonzero("p5", e0, x, 1)
    assert_limit("p5", e0, x, 1, 2)
    checked += 1

    # p6: f(x) = 0 (x<0), 1 (x>=0) -> lim_{x->0^-} f(x) = 0
    assert_limit("p6", sp.Integer(0), x, 0, 0, dir_str="-")
    checked += 1

    # p7: lim_{x->0} (1+2x)^(3/x) = e^6 -> k = 6
    e0 = (1 + 2 * x) ** (3 / x)
    exp0 = 3 / x
    exp1 = (1 / (2 * x)) * (2 * x * 3 / x)
    exp2 = (1 / (2 * x)) * 6
    assert_eq_expr("p7", "exp_rewrite_1", exp0, exp1)
    assert_eq_expr("p7", "exp_rewrite_2", exp1, exp2)
    assert_limit("p7", e0, x, 0, sp.exp(6))
    checked += 1

    # p8: lim_{x->0} (1-3x)^(2/x) = e^(-6) -> k = -6
    e0 = (1 - 3 * x) ** (2 / x)
    exp0 = 2 / x
    exp1 = (1 / (-3 * x)) * (-3 * x * 2 / x)
    exp2 = (1 / (-3 * x)) * (-6)
    assert_eq_expr("p8", "exp_rewrite_1", exp0, exp1)
    assert_eq_expr("p8", "exp_rewrite_2", exp1, exp2)
    assert_limit("p8", e0, x, 0, sp.exp(-6))
    checked += 1

    # p9: lim_{x->0} (1-cos(2x))/x^2 = 2
    e0 = (1 - sp.cos(2 * x)) / x**2
    e1 = (4 * x**2) / (2 * x**2)
    assert_equiv_infinitesimal("p9", "cos_equiv", 1 - sp.cos(2 * x), (2 * x) ** 2 / 2, x, 0)
    assert_eq_expr("p9", "cancel", e1, 2)
    assert_limit("p9", e0, x, 0, 2)
    checked += 1

    # p10: lim_{x->0} ln(1+3x)/sin(2x) = 3/2
    e0 = sp.log(1 + 3 * x) / sp.sin(2 * x)
    assert_equiv_infinitesimal("p10", "ln_equiv", sp.log(1 + 3 * x), 3 * x, x, 0)
    assert_equiv_infinitesimal("p10", "sin_equiv", sp.sin(2 * x), 2 * x, x, 0)
    assert_eq_expr("p10", "cancel", (3 * x) / (2 * x), sp.Rational(3, 2))
    assert_limit("p10", e0, x, 0, sp.Rational(3, 2))
    checked += 1

    # p37: f(u)=sqrt(u), g(x)=5-x^2, f(g(1))=2
    g_val = (5 - x**2).subs(x, 1)
    assert g_val == 4
    assert sp.sqrt(g_val) == 2
    checked += 1

    # p38: lim_{x->2} (x^2+2)/(x+1) = 2
    e0 = (x**2 + 2) / (x + 1)
    assert_denom_nonzero("p38", e0, x, 2)
    assert (x + 1).subs(x, 2) == 3
    assert (x**2 + 2).subs(x, 2) == 6
    assert_limit("p38", e0, x, 2, 2)
    checked += 1

    # p39: lim_{n->oo} (3 + cos(n)/n) = 3
    low = 3 - 1 / n
    high = 3 + 1 / n
    assert_limit("p39", low, n, sp.oo, 3)
    assert_limit("p39", high, n, sp.oo, 3)
    for m in (1, 2, 5, 10, 100):
        val = 3 + math.cos(m) / m
        assert float(low.subs(n, m)) <= val <= float(high.subs(n, m))
    checked += 1

    # p124: f(t)=sqrt(9-t^2), g(x)=2x-1 -> domain [-1, 2], length 3
    dom_t = sp.solveset(9 - t**2 >= 0, t, domain=sp.S.Reals)
    assert dom_t == sp.Interval(-3, 3)
    dom_x = sp.solveset(9 - (2 * x - 1) ** 2 >= 0, x, domain=sp.S.Reals)
    assert dom_x == sp.Interval(-1, 2)
    assert dom_x.end - dom_x.start == 3
    checked += 1

    # p125: lim_{x->3} (sqrt(x+6)-3)/(x-3) = 1/6
    e0 = (sp.sqrt(x + 6) - 3) / (x - 3)
    e1 = (sp.sqrt(x + 6) - 3) * (sp.sqrt(x + 6) + 3) / ((x - 3) * (sp.sqrt(x + 6) + 3))
    e2 = (x - 3) / ((x - 3) * (sp.sqrt(x + 6) + 3))
    e3 = 1 / (sp.sqrt(x + 6) + 3)
    assert_eq_expr("p125", "conjugate", e0, e1)
    assert_eq_expr("p125", "expand_num", e1, e2)
    assert_eq_expr("p125", "cancel", e2, e3)
    assert_denom_nonzero("p125", e3, x, 3)
    assert_limit("p125", e0, x, 3, sp.Rational(1, 6))
    assert e3.subs(x, 3) == sp.Rational(1, 6)
    checked += 1

    # p126: f(x) = ax+4 (x<2), x^2+a (x>=2) continuous at 2 -> a = 0
    left = sp.limit(a * x + 4, x, 2, dir="-")
    right = sp.limit(x**2 + a, x, 2, dir="+")
    assert left == 2 * a + 4
    assert right == 4 + a
    sol = sp.solve(sp.Eq(left, right), a)
    assert sol == [0]
    checked += 1

    # p127: lim_{x->0} sin(5x)/tan(2x) = 5/2
    e0 = sp.sin(5 * x) / sp.tan(2 * x)
    e1 = sp.sin(5 * x) * sp.cos(2 * x) / sp.sin(2 * x)
    e2 = sp.Rational(5, 2) * (sp.sin(5 * x) / (5 * x)) * ((2 * x) / sp.sin(2 * x)) * sp.cos(2 * x)
    assert_eq_expr("p127", "tan_to_sin_cos", e0, e1)
    assert_eq_expr("p127", "normalize", e1, e2)
    assert_limit("p127", e0, x, 0, sp.Rational(5, 2))
    checked += 1

    # p164: sqrt(4x+12) -> left endpoint -3
    dom = sp.solveset(4 * x + 12 >= 0, x, domain=sp.S.Reals)
    assert dom == sp.Interval(-3, sp.oo)
    assert dom.start == -3
    checked += 1

    # p165: 1/sqrt(25-x^2) -> domain (-5, 5), length 10
    dom = sp.solveset(25 - x**2 > 0, x, domain=sp.S.Reals)
    assert dom == sp.Interval.open(-5, 5)
    assert dom.end - dom.start == 10
    checked += 1

    # p166: arcsin(x-5) -> domain [4, 6], right endpoint 6
    dom = sp.solveset(x - 5 >= -1, x, domain=sp.S.Reals).intersect(
        sp.solveset(x - 5 <= 1, x, domain=sp.S.Reals)
    )
    assert dom == sp.Interval(4, 6)
    assert dom.end == 6
    checked += 1

    # p167: lim_{x->2^+} f(x) - lim_{x->2^-} f(x) = 5 - (-2) = 7
    right = sp.limit(x + 3, x, 2, dir="+")
    left = sp.limit(x - 4, x, 2, dir="-")
    assert right == 5 and left == -2 and right - left == 7
    checked += 1

    # p168: lim_{x->4} (x^2-16)/(x+4) = 0
    e0 = (x**2 - 16) / (x + 4)
    e1 = (x - 4) * (x + 4) / (x + 4)
    e2 = x - 4
    assert_eq_expr("p168", "factor", e0, e1)
    assert_eq_expr("p168", "cancel", e1, e2)
    assert_denom_nonzero("p168", e2, x, 4)
    assert_limit("p168", e0, x, 4, 0)
    checked += 1

    # p169: lim_{x->oo} (3x^2-5)/(7x^2+2) = 3/7
    e0 = (3 * x**2 - 5) / (7 * x**2 + 2)
    e1 = (3 - 5 / x**2) / (7 + 2 / x**2)
    assert_eq_expr("p169", "div_x2", e0, e1)
    assert_limit("p169", e0, x, sp.oo, sp.Rational(3, 7))
    checked += 1

    # p170: lim_{n->oo} (1+2+...+(n-1))/(3n^2) = 1/6
    s_num = sp.summation(k, (k, 1, n - 1))
    assert_eq_expr("p170", "sum_formula", s_num, n * (n - 1) / 2)
    e0 = s_num / (3 * n**2)
    e1 = n * (n - 1) / (6 * n**2)
    e2 = (1 - 1 / n) / 6
    assert_eq_expr("p170", "merge_denom", e0, e1)
    assert_eq_expr("p170", "div_n2", e1, e2)
    assert_limit("p170", e0, n, sp.oo, sp.Rational(1, 6))
    checked += 1

    # p171: lim_{x->0} (1-cos(6x))/(x*sin(2x)) = 9
    e0 = (1 - sp.cos(6 * x)) / (x * sp.sin(2 * x))
    e1 = 2 * sp.sin(3 * x) ** 2 / (x * sp.sin(2 * x))
    assert_eq_expr("p171", "double_angle", e0, e1)
    assert_equiv_infinitesimal("p171", "sin3x", sp.sin(3 * x), 3 * x, x, 0)
    assert_equiv_infinitesimal("p171", "sin2x", sp.sin(2 * x), 2 * x, x, 0)
    e2 = 2 * (3 * x) ** 2 / (x * 2 * x)
    assert_eq_expr("p171", "expand_cancel", e2, 9)
    assert_limit("p171", e0, x, 0, 9)
    checked += 1

    # p172: lim_{x->1} (1-x)/(1-x^4) = 1/4
    e0 = (1 - x) / (1 - x**4)
    e1 = (1 - x) / ((1 - x) * (1 + x + x**2 + x**3))
    e2 = 1 / (1 + x + x**2 + x**3)
    assert_eq_expr("p172", "factor", e0, e1)
    assert_eq_expr("p172", "cancel", e1, e2)
    assert_denom_nonzero("p172", e2, x, 1)
    assert_limit("p172", e0, x, 1, sp.Rational(1, 4))
    assert e2.subs(x, 1) == sp.Rational(1, 4)
    checked += 1

    # p173: f(x) = 3e^x (x<0), a+2x (x>=0) continuous at 0 -> a = 3
    left = sp.limit(3 * sp.exp(x), x, 0, dir="-")
    right = sp.limit(a + 2 * x, x, 0, dir="+")
    assert left == 3 and right == a
    assert sp.solve(sp.Eq(left, right), a) == [3]
    checked += 1

    # p174: f(x)=x^5-4x-2 -> f(1)=-5, f(2)=22
    f = x**5 - 4 * x - 2
    assert f.subs(x, 1) == -5
    assert f.subs(x, 2) == 22
    checked += 1

    # --- Written / Proof problems (7 total) ---

    # p204: a_n = 3(-1)^n/(2n+1) -> squeeze between -3/(2n) and 3/(2n) -> 0
    for m in (1, 2, 3, 10, 50):
        val = abs(3 * ((-1) ** m) / (2 * m + 1))
        assert 0 < val < 3 / (2 * m)
    assert_limit("p204", -3 / (2 * n), n, sp.oo, 0)
    assert_limit("p204", 3 / (2 * n), n, sp.oo, 0)
    checked += 1

    # p205: a_n = 4 + 2(-1)^n -> a_{2k} = 6, a_{2k-1} = 2
    a_even = 4 + 2 * (-1) ** (2 * k)
    a_odd = 4 + 2 * (-1) ** (2 * k - 1)
    assert sp.simplify(a_even) == 6
    assert sp.simplify(a_odd) == 2
    checked += 1

    # p206: lim_{x->3} |2x-6|/(x-3) -> left -2, right 2
    f_abs = sp.Abs(2 * x - 6) / (x - 3)
    assert_limit("p206", f_abs, x, 3, -2, dir_str="-")
    assert_limit("p206", f_abs, x, 3, 2, dir_str="+")
    checked += 1

    # p207: S_n = sum_{k=1}^n n/(n^2+2k) -> n/(n+2) <= S_n <= 1 -> 1
    low = n * n / (n**2 + 2 * n)
    high = n * n / (n**2)
    assert_eq_expr("p207", "low_simplify", low, n / (n + 2))
    assert_eq_expr("p207", "high_simplify", high, 1)
    assert_limit("p207", low, n, sp.oo, 1)
    for m in (1, 2, 5, 20):
        s_val = sum(m / (m**2 + 2 * j) for j in range(1, m + 1))
        assert float(low.subs(n, m)) <= s_val <= 1.0 + 1e-12
    checked += 1

    # p208: a_1=1, a_{n+1}=sqrt(6+a_n) -> monotone increasing, bounded by 3, L=3
    seq = [1.0]
    for _ in range(10):
        nxt = math.sqrt(6.0 + seq[-1])
        assert seq[-1] < nxt < 3.0
        seq.append(nxt)
    roots = sp.solve(sp.Eq(L**2 - L - 6, 0), L)
    assert set(roots) == {-2, 3}
    pos_roots = [r for r in roots if r >= 1]
    assert pos_roots == [3]
    checked += 1

    # p209: lim_{n->oo} (2 - x^(2n))/(2 + x^(2n)) -> 1 (|x|<1), 1/3 (|x|=1), -1 (|x|>1)
    e0 = (2 - x ** (2 * n)) / (2 + x ** (2 * n))
    e_gt = (2 / x ** (2 * n) - 1) / (2 / x ** (2 * n) + 1)
    assert_eq_expr("p209", "div_x2n", e0, e_gt)
    assert_limit("p209", e0.subs(x, sp.Rational(1, 2)), n, sp.oo, 1)
    assert_limit("p209", e0.subs(x, 1), n, sp.oo, sp.Rational(1, 3))
    assert_limit("p209", e0.subs(x, -1), n, sp.oo, sp.Rational(1, 3))
    assert_limit("p209", e0.subs(x, 2), n, sp.oo, -1)
    checked += 1

    # p210: f(x)=x^3-4x+1 -> f(-3)=-14, f(-2)=1, f(0)=1, f(1)=-2, f(2)=1
    f = x**3 - 4 * x + 1
    vals = {pt: f.subs(x, pt) for pt in (-3, -2, 0, 1, 2)}
    assert vals == {-3: -14, -2: 1, 0: 1, 1: -2, 2: 1}
    assert vals[-3] * vals[-2] < 0
    assert vals[0] * vals[1] < 0
    assert vals[1] * vals[2] < 0
    checked += 1

    return checked


if __name__ == "__main__":
    t0 = time.perf_counter()
    total = verify_all()
    elapsed = time.perf_counter() - t0
    print(f"OK: verified {total}/35 ch1Core problems in {elapsed:.2f}s")
