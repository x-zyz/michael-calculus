
"""Independent checks for batch 1 originals and candidate transfer outcomes."""
import json
from pathlib import Path

import sympy as s

x, h, a = s.symbols("x h a", real=True)
n = s.symbols("n", positive=True, integer=True)
half = s.Rational(1, 2)


def both_limits(expr, variable, at, expected):
    """Both sides matter at a finite point. At infinity verify both ends."""
    directions = ("-", "+") if at != s.oo else ("+",)
    for direction in directions:
        assert s.simplify(s.limit(expr, variable, at, dir=direction) - expected) == 0
    return expected


def ends(expr, variable, expected):
    for point in (-s.oo, s.oo):
        assert s.simplify(s.limit(expr, variable, point) - expected) == 0
    return expected


def discontinuities():
    expr = (x**2 - 9) / ((x - 3) * (x - 4))
    both_limits(expr, x, 3, -6)
    assert s.limit(expr, x, 4, dir="-") == -s.oo
    assert s.limit(expr, x, 4, dir="+") == s.oo
    assert s.denom(expr).subs(x, 3) == s.denom(expr).subs(x, 4) == 0
    return "x=3 可去，补 -6；x=4 无穷间断"


def jump():
    left_val = (2*x - 4).subs(x, 2)
    right_val = (5 - x).subs(x, 2)
    assert left_val == 0 and right_val == 3 and left_val != right_val
    return "左极限和函数值均为 0，右极限为 3；跳跃间断、仅左连续"


def squeeze():
    # cos(n) stays in [-1, 1], and n is positive throughout the sequence.
    assert s.limit(3 - 1/n, n, s.oo) == s.limit(3 + 1/n, n, s.oo) == 3
    return 3


t = s.symbols("t", real=True)
domain_composite = (
    s.solve_univariate_inequality(9 - (2*x - 1)**2 >= 0, x, relational=False)
)
domain_radical = s.solve_univariate_inequality(4*x + 12 >= 0, x, relational=False)
domain_denominator = s.solve_univariate_inequality(25 - x**2 > 0, x, relational=False)
domain_arcsin = s.solve_univariate_inequality(s.Abs(x - 5) <= 1, x, relational=False)
assert domain_composite == s.Interval(-1, 2)
assert domain_radical == s.Interval(-3, s.oo)
assert domain_denominator == s.Interval.open(-5, 5)
assert domain_arcsin == s.Interval(4, 6)

numeric = {
    "p2": (x**2 + 3*x).subs(x, 2),
    "p4": both_limits(s.sin(2*x) / (3*x), x, 0, s.Rational(2, 3)),
    "p37": s.sqrt((5 - x**2).subs(x, 1)),
    "p38": both_limits((x**2 + 2) / (x + 1), x, 2, 2),
    "p39": squeeze(),
    "p124": domain_composite.measure,
    "p127": both_limits(s.sin(5*x) / s.tan(2*x), x, 0, s.Rational(5, 2)),
    "p128": both_limits((s.sqrt(1 + x) - 1 - x*half) / x**2, x, 0, -s.Rational(1, 8)),
    "p164": domain_radical.start,
    "p165": domain_denominator.measure,
    "p166": domain_arcsin.end,
    "p168": both_limits((x**2 - 16) / (x + 4), x, 4, 0),
    "p169": s.limit((3*x**2 - 5) / (7*x**2 + 2), x, s.oo),
    "p170": s.limit(s.summation(t, (t, 1, n - 1)) / (3*n**2), n, s.oo),
    "p171": both_limits((1 - s.cos(6*x)) / (x*s.sin(2*x)), x, 0, 9),
    "p172": both_limits((1 - x) / (1 - x**4), x, 1, s.Rational(1, 4)),
    "p173": s.solve(s.Eq(a, s.limit(3*s.exp(x), x, 0, dir="-")), a)[0],
    "p174": (x**5 - 4*x - 2).subs(x, 2),
}
written = {
    "jc935-1-5-1-1": both_limits((x**2 + 8) / (x - 6), x, 2, -3),
    "jc935-1-5-1-2": both_limits((x**2 - 4) / (x**2 + 5), x, 2, 0),
    "jc935-1-5-1-3": both_limits((x - 3)**2 / (x**2 - 9), x, 3, 0),
    "jc935-1-5-1-4": both_limits((5*x**3 - x**2 + 3*x) / (4*x**2 + 2*x), x, 0, 3*half),
    "jc935-1-5-1-5": both_limits(((a + 2*h)**2 - a**2) / h, h, 0, 4*a),
    "jc935-1-5-1-7": ends((5*x**2 + 1) / (3*x**2 + 2*x - 4), x, s.Rational(5, 3)),
    "jc935-1-5-1-8": ends((2*x**2 - x) / (x**4 + 2*x**2 + 1), x, 0),
    "jc935-1-5-1-9": both_limits((x**2 - 7*x + 10) / (x**2 - 6*x + 5), x, 5, s.Rational(3, 4)),
    "jc935-1-6-1-2": both_limits(s.tan(5*x) / (2*x), x, 0, 5*half),
    "jc935-1-6-2-2": both_limits((1 + 4*x)**(2/x), x, 0, s.exp(8)),
    "jc935-1-8-3-1": discontinuities(),
    "jc935-1-8-3-4": jump(),
}

plan = json.loads(Path("docs/eli5-production/chapter-one.json").read_text(encoding="utf-8"))
assert {row["id"] for row in plan["items"] if row["batch"] == 1} == numeric.keys() | written.keys()
for problem_id, answer in {**numeric, **written}.items():
    print(problem_id, answer)
print(f"Checked {len(numeric)} numeric and {len(written)} written originals.")

# Candidate snapshot ef2f25f. A changed prompt requires a new check.
def interval(expr, expected):
    assert s.solve_univariate_inequality(expr, x, relational=False) == expected
    return expected

assert s.log(both_limits((1 + 3*x)**(5/x), x, 0, s.exp(15))) == 15
assert (x**4 - 3*x - 1).subs(x, 1) == -3
assert s.limit(5 - 1/n, n, s.oo) == s.limit(5 + 1/n, n, s.oo) == 5
transfers = {
    "p2": both_limits(x**2 + 2*x, x, 3, 15),
    "p4": both_limits(s.sin(3*x) / (4*x), x, 0, s.Rational(3, 4)),
    "p37": s.sqrt(10 - 1**2),
    "p38": both_limits((x**2 + 3) / (x + 1), x, 3, 3),
    "p39": 5,
    "p124": interval(16 - (2*x + 1)**2 >= 0, s.Interval(-5*half, 3*half)).measure,
    "p127": both_limits(s.sin(6*x) / s.tan(3*x), x, 0, 2),
    "p128": both_limits((s.sqrt(1 + 2*x) - 1 - x) / x**2, x, 0, -half),
    "p164": interval(3*x + 15 >= 0, s.Interval(-5, s.oo)).start,
    "p165": interval(36 - x**2 > 0, s.Interval.open(-6, 6)).measure,
    "p166": interval(s.Abs(x - 8) <= 1, s.Interval(7, 9)).end,
    "p168": both_limits((x**2 - 9) / (x + 3), x, 5, 2),
    "p169": s.limit((4*x**2 - 9) / (5*x**2 + 1), x, s.oo),
    "p170": s.limit(s.summation(t, (t, 1, n - 1)) / (2*n**2), n, s.oo),
    "p171": both_limits((1 - s.cos(4*x)) / (x*s.sin(2*x)), x, 0, 4),
    "p172": both_limits((1 - x) / (1 - x**5), x, 1, s.Rational(1, 5)),
    "p173": s.limit(5*s.exp(x), x, 0, dir="-"),
    "p174": (x**4 - 3*x - 1).subs(x, 2),
    "jc935-1-5-1-1": both_limits((x**2 + 9) / (x - 6), x, 1, -2),
    "jc935-1-5-1-2": both_limits((x**2 - 9) / (x**2 + 1), x, 3, 0),
    "jc935-1-5-1-3": both_limits((x - 2)**2 / (x**2 - 4), x, 2, 0),
    "jc935-1-5-1-4": both_limits((3*x**3 + 2*x**2 + 6*x) / (5*x**2 + 2*x), x, 0, 3),
    "jc935-1-5-1-5": both_limits(((3 + 2*h)**2 - 9) / h, h, 0, 12),
    "jc935-1-5-1-7": ends((7*x**2 + 3) / (2*x**2 - 5*x + 1), x, 7*half),
    "jc935-1-5-1-8": ends((5*x**2 + 3*x) / (x**4 + 4*x**2 + 2), x, 0),
    "jc935-1-5-1-9": both_limits((x**2 - 7*x + 12) / (x**2 - 6*x + 8), x, 4, half),
    "jc935-1-6-1-2": both_limits(s.tan(7*x) / (2*x), x, 0, 7*half),
    "jc935-1-6-2-2": 15,
    "jc935-1-8-3-1": both_limits((x**2 - 4) / ((x - 2)*(x - 3)), x, 2, -4),
    "jc935-1-8-3-4": s.limit(x + 5, x, 1, dir="+") - s.limit(3*x - 1, x, 1, dir="-"),
}
assert transfers.keys() == numeric.keys() | written.keys()
for problem_id, answer in transfers.items():
    print("transfer", problem_id, answer)
print("Checked 30 transfer prompts.")
