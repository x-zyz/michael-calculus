"""SymPy step-chain verifier for ch1Sec6to7 guidedHints (jc935-1-6-* & jc935-1-7-*)."""

import math
import sympy as sp

x, t, u = sp.symbols("x t u", real=True)
a, b, k = sp.symbols("a b k", real=True)
n = sp.symbols("n", integer=True, positive=True)


def check_step_chain(
    pid: str,
    exprs: list[sp.Expr],
    var: sp.Symbol,
    point,
    expected_limit,
    dir_str: str = "+-",
    check_final_denom: bool = True,
):
    for i in range(1, len(exprs)):
        diff = sp.simplify(exprs[i] - exprs[i - 1])
        assert diff == 0, f"[{pid}] Step {i-1}->{i} not equivalent: diff={diff}"
    for idx, e in enumerate(exprs):
        if dir_str == "+-":
            lp = sp.limit(e, var, point, dir="+")
            lm = sp.limit(e, var, point, dir="-")
            assert sp.simplify(lp - expected_limit) == 0, f"[{pid}] Step {idx} right limit {lp} != {expected_limit}"
            assert sp.simplify(lm - expected_limit) == 0, f"[{pid}] Step {idx} left limit {lm} != {expected_limit}"
        else:
            lv = sp.limit(e, var, point, dir=dir_str)
            assert sp.simplify(lv - expected_limit) == 0, f"[{pid}] Step {idx} limit {lv} != {expected_limit}"
    if check_final_denom and point not in (sp.oo, -sp.oo):
        _, denom = sp.fraction(sp.together(exprs[-1]))
        assert denom.subs(var, point) != 0, f"[{pid}] Final step denominator vanishes at {point}"


def verify_all():
    # 1. jc935-1-6-1-1: lim_{x->2} sin(a(x-2))/(x-2) = a
    a_nz = sp.symbols("a_nz", real=True, nonzero=True)
    # a = 0 case
    assert sp.simplify(sp.sin(0 * t) / t) == 0
    # a != 0 case: x = t + 2
    e0 = sp.sin(a_nz * (x - 2)) / (x - 2)
    assert sp.simplify(sp.limit(e0, x, 2) - a_nz) == 0
    check_step_chain(
        "jc935-1-6-1-1",
        [
            sp.sin(a_nz * t) / t,
            a_nz * (sp.sin(a_nz * t) / (a_nz * t)),
        ],
        var=t,
        point=0,
        expected_limit=a_nz,
        check_final_denom=False,
    )
    assert sp.limit(sp.sin(u) / u, u, 0) == 1

    # 2. jc935-1-6-1-2: lim_{x->0} tan(5x)/(2x) = 5/2
    check_step_chain(
        "jc935-1-6-1-2",
        [
            sp.tan(5 * x) / (2 * x),
            sp.sin(5 * x) / (2 * x * sp.cos(5 * x)),
            sp.Rational(5, 2) * (sp.sin(5 * x) / (5 * x)) * (1 / sp.cos(5 * x)),
        ],
        var=x,
        point=0,
        expected_limit=sp.Rational(5, 2),
        check_final_denom=False,
    )
    assert sp.limit(sp.sin(5 * x) / (5 * x), x, 0) == 1
    assert sp.limit(sp.cos(5 * x), x, 0) == 1

    # 3. jc935-1-6-1-3: lim_{x->0} sin(3x)/sin(7x) = 3/7
    check_step_chain(
        "jc935-1-6-1-3",
        [
            sp.sin(3 * x) / sp.sin(7 * x),
            ((sp.sin(3 * x) / (3 * x)) * (3 * x)) / ((sp.sin(7 * x) / (7 * x)) * (7 * x)),
            sp.Rational(3, 7) * (sp.sin(3 * x) / (3 * x)) / (sp.sin(7 * x) / (7 * x)),
        ],
        var=x,
        point=0,
        expected_limit=sp.Rational(3, 7),
        check_final_denom=False,
    )

    # 4. jc935-1-6-1-4: lim_{x->0} x*cot(4x) = 1/4
    check_step_chain(
        "jc935-1-6-1-4",
        [
            x * sp.cot(4 * x),
            x * sp.cos(4 * x) / sp.sin(4 * x),
            sp.Rational(1, 4) * (4 * x / sp.sin(4 * x)) * sp.cos(4 * x),
        ],
        var=x,
        point=0,
        expected_limit=sp.Rational(1, 4),
        check_final_denom=False,
    )

    # 5. jc935-1-6-1-5: lim_{x->0} (1-cos(4x))/(x*sin(2x)) = 4
    check_step_chain(
        "jc935-1-6-1-5",
        [
            (1 - sp.cos(4 * x)) / (x * sp.sin(2 * x)),
            2 * sp.sin(2 * x) ** 2 / (x * sp.sin(2 * x)),
            2 * sp.sin(2 * x) / x,
            4 * (sp.sin(2 * x) / (2 * x)),
        ],
        var=x,
        point=0,
        expected_limit=4,
        check_final_denom=False,
    )

    # 6. jc935-1-6-1-6: lim_{n->oo} 5^n * sin(b/5^n) = b
    b_nz = sp.symbols("b_nz", real=True, nonzero=True)
    assert sp.simplify(5**n * sp.sin(0 / 5**n)) == 0
    e6_0 = 5**n * sp.sin(b_nz / 5**n)
    e6_1 = b_nz * sp.sin(b_nz / 5**n) / (b_nz / 5**n)
    assert sp.simplify(e6_0 - e6_1) == 0
    assert sp.simplify(sp.limit(e6_0, n, sp.oo) - b_nz) == 0
    assert sp.simplify(sp.limit(b_nz * sp.sin(t) / t, t, 0) - b_nz) == 0

    # 7. jc935-1-6-2-1: lim_{x->0} (1-3x)^(1/x) = e^(-3)
    assert sp.simplify(sp.limit((1 - 3 * x) ** (1 / x), x, 0) - sp.exp(-3)) == 0
    # Verify algebraic substitution u = -3x => 1/x = -3/u
    assert sp.simplify((1 / x).subs(x, -u / 3) - (-3 / u)) == 0
    assert sp.simplify(sp.limit(((1 + u) ** (1 / u)) ** (-3), u, 0) - sp.exp(-3)) == 0

    # 8. jc935-1-6-2-2: lim_{x->0} (1+4x)^(2/x) = e^8
    assert sp.simplify(sp.limit((1 + 4 * x) ** (2 / x), x, 0) - sp.exp(8)) == 0
    assert sp.simplify((2 / x).subs(x, u / 4) - (8 / u)) == 0
    assert sp.simplify(sp.limit(((1 + u) ** (1 / u)) ** 8, u, 0) - sp.exp(8)) == 0

    # 9. jc935-1-6-2-3: lim_{x->+oo} ((x+3)/x)^(2x) = e^6
    assert sp.simplify(((x + 3) / x) - (1 + 3 / x)) == 0
    assert sp.simplify(sp.limit(((x + 3) / x) ** (2 * x), x, sp.oo) - sp.exp(6)) == 0
    assert sp.simplify((2 * x).subs(x, 3 / u) - (6 / u)) == 0
    assert sp.simplify(sp.limit(((1 + u) ** (1 / u)) ** 6, u, 0) - sp.exp(6)) == 0

    # 10. jc935-1-6-2-4: lim_{x->+oo} (1-2/x)^(kx) = e^(-2k)
    assert sp.simplify(sp.limit((1 - 2 / x) ** (k * x), x, sp.oo) - sp.exp(-2 * k)) == 0
    assert sp.simplify((k * x).subs(x, -2 / u) - (-2 * k / u)) == 0
    assert sp.simplify(sp.limit(((1 + u) ** (1 / u)) ** (-2 * k), u, 0) - sp.exp(-2 * k)) == 0

    # 11. jc935-1-6-4-1: lim_{n->oo} sqrt(1 + 3/n) = 1
    assert sp.limit(sp.sqrt(1 + sp.Rational(3, 1) / n), n, sp.oo) == 1
    assert sp.limit(1 + sp.Rational(3, 1) / n, n, sp.oo) == 1
    for nv in [1, 2, 10, 100]:
        val = math.sqrt(1 + 3 / nv)
        assert 1 <= val <= 1 + 3 / nv

    # 12. jc935-1-6-4-2: S_n = n * sum_{j=1}^n 1/(n^2 + 5j), n/(n+5) <= S_n <= 1
    assert sp.simplify(n * (n / (n**2 + 5 * n)) - n / (n + 5)) == 0
    assert sp.simplify(n * (n / n**2) - 1) == 0
    assert sp.limit(n / (n + 5), n, sp.oo) == 1
    for nv in [1, 5, 20, 100]:
        sn = nv * sum(1.0 / (nv * nv + 5 * j) for j in range(1, nv + 1))
        assert nv / (nv + 5) <= sn + 1e-12 and sn <= 1.0 + 1e-12

    # 13. jc935-1-6-4-3: lim_{x->0} (1+2x)^(1/4) = 1
    assert sp.limit((1 + 2 * x) ** sp.Rational(1, 4), x, 0, dir="+") == 1
    assert sp.limit((1 + 2 * x) ** sp.Rational(1, 4), x, 0, dir="-") == 1
    for xv in [0.01, 0.1, 0.5, 2.0]:
        v = (1 + 2 * xv) ** 0.25
        assert 1 <= v <= 1 + 2 * xv
    for xv in [-0.49, -0.25, -0.1, -0.01]:
        v = (1 + 2 * xv) ** 0.25
        assert 1 + 2 * xv <= v <= 1

    # 14. jc935-1-6-4-4: lim_{x->0+} x * floor(3/x) = 3
    assert sp.limit(3 - x, x, 0, dir="+") == 3
    for xv in [1e-1, 1e-2, 1e-3, 1e-4, 0.037]:
        val = xv * math.floor(3.0 / xv)
        assert 3 - xv < val <= 3 + 1e-12

    # 15. jc935-1-6-5: a_1 = 2, a_{n+1} = sqrt(12 + a_n) -> 4
    L = sp.symbols("L", real=True)
    assert sp.expand((4 - L) * (L + 3) - (12 + L - L**2)) == 0
    roots = sp.solve(L**2 - L - 12, L)
    assert set(roots) == {-3, 4}
    an = sp.Float(2, 50)
    for _ in range(30):
        an_next = sp.sqrt(12 + an)
        assert 0 < an < an_next < 4
        an = an_next
    assert abs(float(an) - 4.0) < 1e-10

    # 16. jc935-1-6-6: 0 < a_1 < pi/2, a_{n+1} = 1/2 sin(a_n) -> 0
    for a1_val in [sp.Rational(1, 10), sp.Rational(4, 5), sp.Rational(3, 2)]:
        a1_hp = sp.Float(a1_val, 50)
        an = a1_hp
        for step in range(1, 25):
            assert 0 < an <= a1_hp / (2 ** (step - 1))
            an_next = sp.Rational(1, 2) * sp.sin(an)
            assert 0 < an_next < an / 2
            an = an_next
        assert an < sp.Float("1e-6")

    # 17. jc935-1-7-1: alpha=3x+x^2, beta=2x^2-x^3, x->0
    check_step_chain(
        "jc935-1-7-1",
        [
            (2 * x**2 - x**3) / (3 * x + x**2),
            x * (2 - x) / (3 + x),
        ],
        var=x,
        point=0,
        expected_limit=0,
    )

    # 18. jc935-1-7-2: alpha=(1-cos(2x))^2, beta=sin(x)^2, x->0
    assert sp.simplify((1 - sp.cos(2 * x)) ** 2 - 4 * sp.sin(x) ** 4) == 0
    check_step_chain(
        "jc935-1-7-2",
        [
            (1 - sp.cos(2 * x)) ** 2 / sp.sin(x) ** 2,
            4 * sp.sin(x) ** 4 / sp.sin(x) ** 2,
            4 * sp.sin(x) ** 2,
        ],
        var=x,
        point=0,
        expected_limit=0,
    )

    # 19. jc935-1-7-3-1: alpha=x-2, beta=x^3-8, x->2
    check_step_chain(
        "jc935-1-7-3-1",
        [
            (x - 2) / (x**3 - 8),
            (x - 2) / ((x - 2) * (x**2 + 2 * x + 4)),
            1 / (x**2 + 2 * x + 4),
        ],
        var=x,
        point=2,
        expected_limit=sp.Rational(1, 12),
    )

    # 20. jc935-1-7-3-2: alpha=x-2, beta=(x^2-4)/4, x->2
    check_step_chain(
        "jc935-1-7-3-2",
        [
            (x - 2) / ((x**2 - 4) / 4),
            (x - 2) / ((x - 2) * (x + 2) / 4),
            4 / (x + 2),
        ],
        var=x,
        point=2,
        expected_limit=1,
    )

    # 21. jc935-1-7-4-1: arctan(4x) ~ 4x as x->0
    assert sp.limit(sp.atan(4 * x) / (4 * x), x, 0) == 1
    check_step_chain(
        "jc935-1-7-4-1",
        [
            t / sp.tan(t),
            (t / sp.sin(t)) * sp.cos(t),
        ],
        var=t,
        point=0,
        expected_limit=1,
        check_final_denom=False,
    )

    # 22. jc935-1-7-4-2: sec(3x)-1 ~ (9/2)x^2 as x->0
    check_step_chain(
        "jc935-1-7-4-2",
        [
            (sp.sec(3 * x) - 1) / (sp.Rational(9, 2) * x**2),
            ((1 - sp.cos(3 * x)) / sp.cos(3 * x)) / (sp.Rational(9, 2) * x**2),
            (2 * sp.sin(3 * x / 2) ** 2 / sp.cos(3 * x)) / (sp.Rational(9, 2) * x**2),
            (sp.sin(3 * x / 2) / (3 * x / 2)) ** 2 / sp.cos(3 * x),
        ],
        var=x,
        point=0,
        expected_limit=1,
        check_final_denom=False,
    )

    # 23. jc935-1-7-5-1: lim_{x->0} tan(7x)/(4x) = 7/4
    assert sp.limit(sp.tan(7 * x) / (7 * x), x, 0) == 1
    assert sp.limit(sp.tan(7 * x) / (4 * x), x, 0) == sp.Rational(7, 4)
    assert sp.simplify(7 * x / (4 * x) - sp.Rational(7, 4)) == 0

    # 24. jc935-1-7-5-2: lim_{x->0+} sin(2x^n)/(sin x)^m
    for nv, mv, expected in [(3, 2, 0), (2, 2, 2), (2, 3, sp.oo)]:
        expr = sp.sin(2 * x**nv) / (sp.sin(x) ** mv)
        equiv = 2 * x ** (nv - mv)
        assert sp.limit(expr, x, 0, dir="+") == expected
        assert sp.limit(equiv, x, 0, dir="+") == expected
        assert sp.limit(expr / equiv, x, 0, dir="+") == 1

    # 25. jc935-1-7-5-3: lim_{x->0} (tan(2x)-sin(2x))/sin(x)^3 = 4
    e25_0 = (sp.tan(2 * x) - sp.sin(2 * x)) / sp.sin(x) ** 3
    e25_1 = sp.sin(2 * x) * (sp.sec(2 * x) - 1) / sp.sin(x) ** 3
    assert sp.simplify(e25_0 - e25_1) == 0
    assert sp.limit(sp.sin(2 * x) / (2 * x), x, 0) == 1
    assert sp.limit((sp.sec(2 * x) - 1) / (2 * x**2), x, 0) == 1
    assert sp.limit(sp.sin(x) ** 3 / x**3, x, 0) == 1
    assert sp.limit(e25_0, x, 0) == 4
    assert sp.simplify((2 * x) * (2 * x**2) / x**3 - 4) == 0

    # 26. jc935-1-7-5-4: lim_{x->0} (sin(2x)-tan(2x))/(A(x)B(x)) = -4
    A = sp.cbrt(1 + 2 * x**2) - 1
    B = sp.sqrt(1 + 3 * sp.sin(x)) - 1
    num = sp.sin(2 * x) - sp.tan(2 * x)
    num_fact = sp.sin(2 * x) * (1 - sp.sec(2 * x))
    assert sp.simplify(num - num_fact) == 0
    assert sp.limit(sp.sin(2 * x) / (2 * x), x, 0) == 1
    assert sp.limit((1 - sp.sec(2 * x)) / (-2 * x**2), x, 0) == 1
    assert sp.limit(A / (sp.Rational(2, 3) * x**2), x, 0) == 1
    assert sp.limit(B / (sp.Rational(3, 2) * x), x, 0) == 1
    assert sp.limit(num / (A * B), x, 0) == -4
    assert sp.simplify((-4 * x**3) / ((sp.Rational(2, 3) * x**2) * (sp.Rational(3, 2) * x)) - (-4)) == 0

    print("ALL 26 COMPUTABLE PROBLEMS IN ch1Sec6to7 VERIFIED SUCCESSFULLY!")


if __name__ == "__main__":
    verify_all()
