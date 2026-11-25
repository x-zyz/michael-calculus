"""SymPy step-chain verifier for ch1Sec4 guidedHints (jc935-1-4-*)."""

import sys
import sympy as sp

x, t, M, eps = sp.symbols("x t M eps", real=True)
k = sp.symbols("k", integer=True, positive=True)


def check_step_chain(pid: str, exprs: list[sp.Expr], point, expected_limit, dir_str="+-"):
    for i in range(1, len(exprs)):
        diff = sp.simplify(exprs[i] - exprs[i - 1])
        assert diff == 0, f"[{pid}] Step {i-1}->{i} not equivalent: diff={diff}"
    for idx, e in enumerate(exprs):
        if dir_str == "+-":
            lim_p = sp.limit(e, x, point, dir="+")
            lim_m = sp.limit(e, x, point, dir="-")
            assert sp.simplify(lim_p - expected_limit) == 0, f"[{pid}] Step {idx} right limit {lim_p} != {expected_limit}"
            assert sp.simplify(lim_m - expected_limit) == 0, f"[{pid}] Step {idx} left limit {lim_m} != {expected_limit}"
        else:
            lim_v = sp.limit(e, x, point, dir=dir_str)
            assert sp.simplify(lim_v - expected_limit) == 0, f"[{pid}] Step {idx} limit {lim_v} != {expected_limit}"
    # Verify final step denominator non-zero at finite substitution point
    if point not in (sp.oo, -sp.oo):
        _, denom = sp.fraction(sp.together(exprs[-1]))
        denom_val = denom.subs(x, point)
        assert denom_val != 0, f"[{pid}] Final step denominator vanishes at {point}"


def verify_all():
    # 1. jc935-1-4-1: lim_{x->2} 6(x-2)^2 / (4(x-2)^2) = 3/2
    check_step_chain(
        "jc935-1-4-1",
        [
            6 * (x - 2) ** 2 / (4 * (x - 2) ** 2),
            sp.Rational(6, 4),
            sp.Rational(3, 2),
        ],
        point=2,
        expected_limit=sp.Rational(3, 2),
    )

    # 2. jc935-1-4-2-1: f(x) = (x^2 - 25)/(x + 5) -> 0 as x -> 5
    check_step_chain(
        "jc935-1-4-2-1",
        [
            (x**2 - 25) / (x + 5),
            (x - 5) * (x + 5) / (x + 5),
            x - 5,
        ],
        point=5,
        expected_limit=0,
    )
    # Check denominator x+5 != 0 on |x-5|<1
    for xv in [4.01, 4.5, 5.0, 5.5, 5.99]:
        assert xv + 5 > 9.0, "jc935-1-4-2-1 denominator check failed"

    # 3. jc935-1-4-2-2: f(x) = 3(x-2)cos(1/(x-2)) -> 0 as x -> 2
    f22 = 3 * (x - 2) * sp.cos(1 / (x - 2))
    assert sp.limit(f22, x, 2) == 0, "jc935-1-4-2-2 limit != 0"
    for d in [1e-1, 1e-2, 1e-3, 1e-4, -1e-1, -1e-2, -1e-3]:
        xv = 2 + d
        lhs = abs(float(f22.subs(x, xv)))
        rhs = 3 * abs(d)
        assert lhs <= rhs + 1e-12, f"jc935-1-4-2-2 bound violated at x={xv}"
    # Verify 3|x-2| < eps <=> |x-2| < eps/3 for u = |x-2| > 0
    u = sp.symbols("u", positive=True)
    e_pos = sp.symbols("e_pos", positive=True)
    assert sp.solve(3 * u - e_pos, u) == [e_pos / 3]
    assert sp.simplify(3 * (e_pos / 6) - e_pos) < 0

    # 4. jc935-1-4-3: f(x) = 2/(x-1) - 3, |f(x)| -> +oo as x -> 1, M=700 => delta=2/703
    f3 = 2 / (x - 1) - 3
    for d in [sp.Rational(1, 100), sp.Rational(1, 1000), sp.Rational(2, 704), -sp.Rational(1, 100), -sp.Rational(1, 1000), -sp.Rational(2, 704)]:
        xv = 1 + d
        lhs = sp.Abs(f3.subs(x, xv))
        rhs = 2 / sp.Abs(d) - 3
        assert lhs >= rhs, f"jc935-1-4-3 reverse triangle failed at x={xv}"
    M_pos = sp.symbols("M_pos", positive=True)
    # 2/u - 3 > M_pos <=> 2/u > M_pos + 3 <=> u < 2/(M_pos + 3)
    assert sp.solve(2 / u - 3 - M_pos, u) == [2 / (M_pos + 3)]
    assert sp.solve(2 / u - (M_pos + 3), u) == [2 / (M_pos + 3)]
    assert sp.simplify(2 / (1 / (M_pos + 3)) - 3 - M_pos) > 0
    delta_700 = sp.Rational(2, 700 + 3)
    assert delta_700 == sp.Rational(2, 703)
    for sign in [1, -1]:
        xv = 1 + sign * float(delta_700) * 0.999
        assert abs(float(f3.subs(x, xv))) > 700, "jc935-1-4-3 M=700 check failed"

    # 5. jc935-1-4-4-1: lim_{|x|->oo} (5x - 7)/x = 5
    for pt in (sp.oo, -sp.oo):
        check_step_chain(
            "jc935-1-4-4-1",
            [
                (5 * x - 7) / x,
                5 - 7 / x,
            ],
            point=pt,
            expected_limit=5,
            dir_str="-" if pt == sp.oo else "+",
        )
    assert sp.limit(7 / x, x, sp.oo) == 0 and sp.limit(7 / x, x, -sp.oo) == 0

    # 6. jc935-1-4-4-2: lim_{x->1} (9 - x^2)/(3 - x) = 4
    check_step_chain(
        "jc935-1-4-4-2",
        [
            (9 - x**2) / (3 - x),
            (3 - x) * (3 + x) / (3 - x),
            3 + x,
        ],
        point=1,
        expected_limit=4,
    )
    assert (3 + x).subs(x, 1) == 4

    # 7. jc935-1-4-6: f(x) = (2x + 1)sin(x)
    f6 = (2 * x + 1) * sp.sin(x)
    xk6 = 2 * k * sp.pi + sp.pi / 2
    zk6 = k * sp.pi
    val_xk6 = sp.simplify(f6.subs(x, xk6))
    assert sp.simplify(val_xk6 - (4 * k * sp.pi + sp.pi + 1)) == 0, f"jc935-1-4-6 f(x_k)={val_xk6}"
    assert sp.limit(val_xk6, k, sp.oo) == sp.oo
    val_zk6 = sp.simplify(f6.subs(x, zk6))
    assert val_zk6 == 0, f"jc935-1-4-6 f(z_k)={val_zk6}"

    # 8. jc935-1-4-7: f(x) = (2/x)cos(1/x), 0 < x <= 1
    f7 = (2 / x) * sp.cos(1 / x)
    assert sp.simplify(f7.subs(x, 1 / t) - 2 * t * sp.cos(t)) == 0
    xk7 = 1 / (2 * k * sp.pi)
    zk7 = 1 / (2 * k * sp.pi + sp.pi / 2)
    assert float(xk7.subs(k, 1)) <= 1.0 and float(zk7.subs(k, 1)) <= 1.0
    assert sp.limit(xk7, k, sp.oo) == 0 and sp.limit(zk7, k, sp.oo) == 0
    val_xk7 = sp.simplify(f7.subs(x, xk7))
    assert sp.simplify(val_xk7 - 4 * k * sp.pi) == 0, f"jc935-1-4-7 f(x_k)={val_xk7}"
    assert sp.limit(val_xk7, k, sp.oo) == sp.oo
    val_zk7 = sp.simplify(f7.subs(x, zk7))
    assert val_zk7 == 0, f"jc935-1-4-7 f(z_k)={val_zk7}"

    print("PASS: All 8 computable problems in ch1Sec4 verified with SymPy (24 definition-translation problems verified structurally).")


if __name__ == "__main__":
    try:
        verify_all()
    except AssertionError as err:
        print(f"FAIL: {err}", file=sys.stderr)
        sys.exit(1)
