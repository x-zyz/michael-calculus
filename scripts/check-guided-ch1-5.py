"""SymPy step-chain verifier for ch1Sec5 guidedHints (jc935-1-5-*)."""

import sys
import sympy as sp

x, h, a = sp.symbols("x h a", real=True)
n, k = sp.symbols("n k", integer=True, positive=True)


def check_step_chain(
    pid: str,
    exprs: list[sp.Expr],
    var: sp.Symbol,
    point,
    expected_limit,
    dir_str: str = "+-",
):
    for i in range(1, len(exprs)):
        diff = sp.simplify(exprs[i] - exprs[i - 1])
        assert diff == 0, f"[{pid}] Step {i-1}->{i} not equivalent: diff={diff}"

    for idx, e in enumerate(exprs):
        if dir_str == "+-":
            lim_p = sp.limit(e, var, point, dir="+")
            lim_m = sp.limit(e, var, point, dir="-")
            assert sp.simplify(lim_p - expected_limit) == 0, (
                f"[{pid}] Step {idx} right limit {lim_p} != {expected_limit}"
            )
            assert sp.simplify(lim_m - expected_limit) == 0, (
                f"[{pid}] Step {idx} left limit {lim_m} != {expected_limit}"
            )
        else:
            lim_v = sp.limit(e, var, point, dir=dir_str)
            assert sp.simplify(lim_v - expected_limit) == 0, (
                f"[{pid}] Step {idx} limit {lim_v} != {expected_limit}"
            )

    if point not in (sp.oo, -sp.oo):
        _, denom = sp.fraction(sp.together(exprs[-1]))
        denom_val = sp.simplify(denom.subs(var, point))
        assert denom_val != 0, f"[{pid}] Final step denominator vanishes at {point}"


def verify_all():
    # 1. jc935-1-5-1-1: lim_{x->2} (x^2+8)/(x-6) = -3
    check_step_chain(
        "jc935-1-5-1-1",
        [(x**2 + 8) / (x - 6)],
        x,
        2,
        sp.Integer(-3),
    )

    # 2. jc935-1-5-1-2: lim_{x->2} (x^2-4)/(x^2+5) = 0
    check_step_chain(
        "jc935-1-5-1-2",
        [(x**2 - 4) / (x**2 + 5)],
        x,
        2,
        sp.Integer(0),
    )

    # 3. jc935-1-5-1-3: lim_{x->3} (x-3)^2/(x^2-9) = 0
    check_step_chain(
        "jc935-1-5-1-3",
        [
            (x - 3) ** 2 / (x**2 - 9),
            (x - 3) ** 2 / ((x - 3) * (x + 3)),
            (x - 3) / (x + 3),
        ],
        x,
        3,
        sp.Integer(0),
    )

    # 4. jc935-1-5-1-4: lim_{x->0} (5x^3 - x^2 + 3x)/(4x^2 + 2x) = 3/2
    check_step_chain(
        "jc935-1-5-1-4",
        [
            (5 * x**3 - x**2 + 3 * x) / (4 * x**2 + 2 * x),
            (x * (5 * x**2 - x + 3)) / (x * (4 * x + 2)),
            (5 * x**2 - x + 3) / (4 * x + 2),
        ],
        x,
        0,
        sp.Rational(3, 2),
    )

    # 5. jc935-1-5-1-5: lim_{h->0} ((a+2h)^2 - a^2)/h = 4a
    check_step_chain(
        "jc935-1-5-1-5",
        [
            ((a + 2 * h) ** 2 - a**2) / h,
            (a**2 + 4 * a * h + 4 * h**2 - a**2) / h,
            (h * (4 * a + 4 * h)) / h,
            4 * a + 4 * h,
        ],
        h,
        0,
        4 * a,
    )

    # 6. jc935-1-5-1-6: lim_{|x|->oo} (4 + 2/x - 5/x^2) = 4
    for pt in (sp.oo, -sp.oo):
        check_step_chain(
            "jc935-1-5-1-6",
            [4 + 2 / x - 5 / x**2],
            x,
            pt,
            sp.Integer(4),
            dir_str="-" if pt == sp.oo else "+",
        )

    # 7. jc935-1-5-1-7: lim_{|x|->oo} (5x^2+1)/(3x^2+2x-4) = 5/3
    for pt in (sp.oo, -sp.oo):
        check_step_chain(
            "jc935-1-5-1-7",
            [
                (5 * x**2 + 1) / (3 * x**2 + 2 * x - 4),
                (5 + 1 / x**2) / (3 + 2 / x - 4 / x**2),
            ],
            x,
            pt,
            sp.Rational(5, 3),
            dir_str="-" if pt == sp.oo else "+",
        )

    # 8. jc935-1-5-1-8: lim_{|x|->oo} (2x^2-x)/(x^4+2x^2+1) = 0
    for pt in (sp.oo, -sp.oo):
        check_step_chain(
            "jc935-1-5-1-8",
            [
                (2 * x**2 - x) / (x**4 + 2 * x**2 + 1),
                (2 / x**2 - 1 / x**3) / (1 + 2 / x**2 + 1 / x**4),
            ],
            x,
            pt,
            sp.Integer(0),
            dir_str="-" if pt == sp.oo else "+",
        )

    # 9. jc935-1-5-1-9: lim_{x->5} (x^2-7x+10)/(x^2-6x+5) = 3/4
    check_step_chain(
        "jc935-1-5-1-9",
        [
            (x**2 - 7 * x + 10) / (x**2 - 6 * x + 5),
            ((x - 5) * (x - 2)) / ((x - 5) * (x - 1)),
            (x - 2) / (x - 1),
        ],
        x,
        5,
        sp.Rational(3, 4),
    )

    # 10. jc935-1-5-1-10: lim_{|x|->oo} (2 - 3/x)(5 + 1/x^2) = 10
    for pt in (sp.oo, -sp.oo):
        d = "-" if pt == sp.oo else "+"
        assert sp.limit(2 - 3 / x, x, pt, dir=d) == 2
        assert sp.limit(5 + 1 / x**2, x, pt, dir=d) == 5
        check_step_chain(
            "jc935-1-5-1-10",
            [(2 - 3 / x) * (5 + 1 / x**2)],
            x,
            pt,
            sp.Integer(10),
            dir_str=d,
        )

    # 11. jc935-1-5-1-11: lim_{n->oo} sum_{k=0}^n 3^{-k} = 3/2
    j = sp.symbols("j", integer=True, nonnegative=True)
    geom_sum = sp.summation(sp.Rational(1, 3) ** j, (j, 0, n))
    geom_closed = (1 - sp.Rational(1, 3) ** (n + 1)) / (1 - sp.Rational(1, 3))
    check_step_chain(
        "jc935-1-5-1-11",
        [geom_sum, geom_closed],
        n,
        sp.oo,
        sp.Rational(3, 2),
        dir_str="-",
    )

    # 12. jc935-1-5-1-12: lim_{n->oo} (2+4+...+2(n-1))/(5n^2) = 1/5
    arith_sum = sp.summation(2 * j, (j, 1, n - 1))
    check_step_chain(
        "jc935-1-5-1-12",
        [
            arith_sum / (5 * n**2),
            (n * (n - 1)) / (5 * n**2),
            (1 - 1 / n) / 5,
        ],
        n,
        sp.oo,
        sp.Rational(1, 5),
        dir_str="-",
    )

    # 13. jc935-1-5-1-13: lim_{n->oo} (n+2)(n+4)(n+6)/(7n^3) = 1/7
    check_step_chain(
        "jc935-1-5-1-13",
        [
            ((n + 2) * (n + 4) * (n + 6)) / (7 * n**3),
            sp.Rational(1, 7) * ((n + 2) / n) * ((n + 4) / n) * ((n + 6) / n),
            sp.Rational(1, 7) * (1 + 2 / n) * (1 + 4 / n) * (1 + 6 / n),
        ],
        n,
        sp.oo,
        sp.Rational(1, 7),
        dir_str="-",
    )

    # 14. jc935-1-5-1-14: lim_{x->2} (1/(2-x) - 12/(8-x^3)) = -1/2
    check_step_chain(
        "jc935-1-5-1-14",
        [
            1 / (2 - x) - 12 / (8 - x**3),
            1 / (2 - x) - 12 / ((2 - x) * (x**2 + 2 * x + 4)),
            (x**2 + 2 * x - 8) / ((2 - x) * (x**2 + 2 * x + 4)),
            ((x - 2) * (x + 4)) / ((2 - x) * (x**2 + 2 * x + 4)),
            -(x + 4) / (x**2 + 2 * x + 4),
        ],
        x,
        2,
        -sp.Rational(1, 2),
    )

    # 15. jc935-1-5-2-1: lim_{x->3} (x^3+x^2)/(x-3)^2 = +oo
    f21 = (x**3 + x**2) / (x - 3) ** 2
    assert sp.limit(f21, x, 3, dir="+") == sp.oo
    assert sp.limit(f21, x, 3, dir="-") == sp.oo
    for xv in [2.9, 2.99, 3.01, 3.1]:
        assert (xv**3 + xv**2) > 18
        assert (xv**3 + xv**2) / (xv - 3) ** 2 > 18 / (xv - 3) ** 2

    # 16. jc935-1-5-2-2: lim_{x->+oo} x^2/(3x+5) = +oo
    f22_0 = x**2 / (3 * x + 5)
    f22_1 = x / (3 + 5 / x)
    assert sp.simplify(f22_1 - f22_0) == 0
    assert sp.limit(f22_0, x, sp.oo) == sp.oo
    for xv in [6, 10, 100, 1000]:
        assert 0 < 3 + 5 / xv < 4
        assert xv**2 / (3 * xv + 5) > xv / 4

    # 17. jc935-1-5-2-3: lim_{|x|->oo} |3x^3 - 2x + 5| = +oo
    f23_0 = sp.Abs(3 * x**3 - 2 * x + 5)
    f23_1 = sp.Abs(x) ** 3 * sp.Abs(3 - 2 / x**2 + 5 / x**3)
    for xv in [-100, -10, 10, 100]:
        assert sp.simplify(f23_0.subs(x, xv) - f23_1.subs(x, xv)) == 0
        assert abs(3 - 2 / xv**2 + 5 / xv**3) > 2
        assert abs(3 * xv**3 - 2 * xv + 5) > 2 * abs(xv) ** 3
    assert sp.limit(f23_0, x, sp.oo) == sp.oo
    assert sp.limit(f23_0, x, -sp.oo) == sp.oo

    # 18. jc935-1-5-3-1: lim_{x->0} 4x^2 cos(2/x) = 0
    f31 = 4 * x**2 * sp.cos(2 / x)
    assert sp.limit(4 * x**2, x, 0) == 0
    for xv in [-0.1, -0.01, -0.001, 0.001, 0.01, 0.1]:
        assert abs(float(f31.subs(x, xv))) <= 4 * xv**2 + 1e-12

    # 19. jc935-1-5-3-2: lim_{|x|->oo} 2*arctan(x)/(3x) = 0
    f32 = 2 * sp.atan(x) / (3 * x)
    assert sp.limit(f32, x, sp.oo) == 0
    assert sp.limit(f32, x, -sp.oo) == 0
    assert sp.limit(sp.pi / (3 * sp.Abs(x)), x, sp.oo) == 0
    assert sp.limit(sp.pi / (3 * sp.Abs(x)), x, -sp.oo) == 0
    for xv in [-1000, -10, -1, 1, 10, 1000]:
        assert abs(float(f32.subs(x, xv))) < float(sp.pi / (3 * abs(xv)))

    # 20. jc935-1-5-4-1: counterexample a_n = 3/n, b_n = 2 - 1/n
    an_41 = 3 / n
    bn_41 = 2 - 1 / n
    assert sp.limit(an_41, n, sp.oo) == 0
    assert sp.limit(bn_41, n, sp.oo) == 2
    assert an_41.subs(n, 1) == 3 and bn_41.subs(n, 1) == 1
    assert an_41.subs(n, 1) > bn_41.subs(n, 1)

    # 21. jc935-1-5-4-2: counterexample b_n = 2 + 4/n, c_n = n
    bn_42 = 2 + 4 / n
    cn_42 = n
    assert sp.limit(bn_42, n, sp.oo) == 2
    assert sp.limit(cn_42, n, sp.oo) == sp.oo
    assert bn_42.subs(n, 1) == 6 and cn_42.subs(n, 1) == 1
    assert bn_42.subs(n, 1) > cn_42.subs(n, 1)

    # 22. jc935-1-5-4-3: counterexample a_n = 1/n^2, c_n = n => a_n*c_n = 1/n -> 0
    an_43 = 1 / n**2
    cn_43 = n
    assert sp.limit(an_43, n, sp.oo) == 0
    assert sp.limit(cn_43, n, sp.oo) == sp.oo
    assert sp.simplify(an_43 * cn_43 - 1 / n) == 0
    assert sp.limit(an_43 * cn_43, n, sp.oo) == 0

    # 25. jc935-1-5-5-2: f(x)=3cos(1/(x-2)), g(x)=-3cos(1/(x-2))
    f52 = 3 * sp.cos(1 / (x - 2))
    g52 = -3 * sp.cos(1 / (x - 2))
    xk_52 = 2 + 1 / (2 * k * sp.pi)
    yk_52 = 2 + 1 / ((2 * k + 1) * sp.pi)
    assert sp.simplify(f52.subs(x, xk_52)) == 3
    assert sp.simplify(f52.subs(x, yk_52)) == -3
    assert sp.simplify(g52.subs(x, xk_52)) == -3
    assert sp.simplify(g52.subs(x, yk_52)) == 3
    assert sp.simplify(f52 + g52) == 0

    # 26. jc935-1-5-5-3: f(x)=(x-2)^2, g(x)=1/(x-2)
    f53 = (x - 2) ** 2
    g53 = 1 / (x - 2)
    assert sp.limit(f53, x, 2) == 0
    assert sp.limit(g53, x, 2, dir="+") == sp.oo
    assert sp.limit(g53, x, 2, dir="-") == -sp.oo
    assert sp.simplify(f53 * g53 - (x - 2)) == 0
    assert sp.limit(f53 * g53, x, 2) == 0

    # 27. jc935-1-5-5-4: f(x)=2+sin(1/(x-1)), g(x)=1/f(x)
    f54 = 2 + sp.sin(1 / (x - 1))
    g54 = 1 / f54
    xk_54 = 1 + 1 / (2 * k * sp.pi + sp.pi / 2)
    yk_54 = 1 + 1 / (2 * k * sp.pi + 3 * sp.pi / 2)
    assert sp.simplify(f54.subs(x, xk_54)) == 3
    assert sp.simplify(g54.subs(x, xk_54)) == sp.Rational(1, 3)
    assert sp.simplify(f54.subs(x, yk_54)) == 1
    assert sp.simplify(g54.subs(x, yk_54)) == 1
    assert sp.simplify(f54 * g54 - 1) == 0

    # 29. jc935-1-5-7: algebraic identity for product limit error split
    fv, gv, Av, Bv = sp.symbols("fv gv Av Bv", real=True)
    assert sp.expand((fv * gv - Av * Bv) - (fv * (gv - Bv) + Bv * (fv - Av))) == 0

    print("ALL ch1Sec5 SymPy checks PASSED (26 symbolic/hybrid + 3 pure proof).")


if __name__ == "__main__":
    try:
        verify_all()
    except Exception as exc:
        print(f"VERIFICATION FAILED: {exc}", file=sys.stderr)
        sys.exit(1)
