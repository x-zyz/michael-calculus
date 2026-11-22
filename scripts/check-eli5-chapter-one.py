"""Verify both problems for each pilot ID against the shared expected answers."""

import json
from pathlib import Path
from sympy import limit, log, Rational, sin, cos, solve, sqrt, symbols

x, a = symbols("x a", real=True)
cases = json.loads(Path(__file__).with_name("eli5-chapter-one-cases.json").read_text(encoding="utf-8"))


def two_sided(expr, point=0):
    left = limit(expr, x, point, dir="-")
    right = limit(expr, x, point, dir="+")
    assert left == right, (expr, left, right)
    return left


def euler(coefficient, exponent):
    return log(two_sided((1 + coefficient * x) ** (exponent / x)))


def match(left, right, point):
    result = solve(limit(left, x, point, dir="-") - limit(right, x, point, dir="+"), a)
    assert len(result) == 1, result
    return result[0]


def jump(left, right, point):
    return limit(right, x, point, dir="+") - limit(left, x, point, dir="-")


checks = {
    "p1": ("cancel", two_sided((x**2 - 1) / (x - 1), 1), two_sided((x**2 - 9) / (x - 3), 3)),
    "p3": ("sine-scale", two_sided(sin(3*x) / (5*x)), two_sided(sin(4*x) / (7*x))),
    "p5": ("fill-point", two_sided(x + 1, 1), two_sided(3*x - 1, 2)),
    "p6": ("side", limit(Rational(0), x, 0, dir="-"), limit(Rational(4), x, 2, dir="-")),
    "p7": ("euler", euler(2, 3), euler(4, 2)),
    "p9": ("cosine-order", two_sided((1-cos(2*x)) / x**2), two_sided((1-cos(4*x)) / x**2)),
    "p10": ("equivalent-quotient", two_sided(log(1+3*x) / sin(2*x)), two_sided(log(1+5*x) / sin(8*x))),
    "p125": ("conjugate", two_sided((sqrt(x+6)-3)/(x-3), 3), two_sided((sqrt(x+12)-4)/(x-4), 4)),
    "p126": ("match-branches", match(a*x+4, x**2+a, 2), match(a*x+2, x**2+2*a, 1)),
    "p167": ("jump", jump(x-4, x+3, 2), jump(Rational(5), Rational(2), 0)),
}

assert cases.keys() == checks.keys()
for problem_id, (strategy, original, transfer) in checks.items():
    expected_strategy, original_answer, transfer_answer = cases[problem_id]
    assert strategy == expected_strategy
    assert original == Rational(original_answer), (problem_id, original)
    assert transfer == Rational(transfer_answer), (problem_id, transfer)
print("10 original and 10 transfer answers verified; each pair uses the same strategy.")
