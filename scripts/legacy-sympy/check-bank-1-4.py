"""Check the calculable results for JC935 exercise 1-4 with SymPy."""
from sympy import Abs, Rational, cos, limit, oo, pi, sin, simplify, symbols

x = symbols("x", real=True)
k = symbols("k", integer=True, positive=True)
m = symbols("M", positive=True)
checked = []


def check(item, *comparisons):
    for actual, expected in comparisons:
        assert actual == expected, (item, actual, expected)
    checked.append("jc935-1-4-" + item)


check("1", (limit(6 * (x - 2)**2 / (4 * (x - 2)**2), x, 2), Rational(3, 2)))
removable = (x**2 - 25) / (x + 5)
check("2-1", (simplify(removable), x - 5), (limit(removable, x, 5), 0))
oscillation = 3 * (x - 2) * cos(1 / (x - 2))
check("2-2", (limit(oscillation, x, 2, dir="-"), 0), (limit(oscillation, x, 2), 0))

pole = 2 / (x - 1) - 3
radius = 2 / (m + 3)
check("3", (simplify(2 / radius - 3), m), (radius.subs(m, 700), Rational(2, 703)),
      (limit(pole, x, 1, dir="-"), -oo), (limit(pole, x, 1), oo))
check("4-1", (limit((5*x - 7) / x, x, oo), 5), (limit((5*x - 7) / x, x, -oo), 5))
check("4-2", (simplify((9 - x**2) / (3 - x)), x + 3), (limit((9 - x**2) / (3 - x), x, 1), 4))

high = 2*k*pi + pi/2
zeros = k*pi
check("6", (simplify((2*high + 1) * sin(high)), 2*high + 1),
      (limit(2*high + 1, k, oo), oo), (simplify((2*zeros + 1) * sin(zeros)), 0))
high = 1 / (2*k*pi)
zeros = 1 / (2*k*pi + pi/2)
check("7", (limit(high, k, oo), 0), (limit(zeros, k, oo), 0),
      (simplify(2/high * cos(1/high)), 4*k*pi), (simplify(2/zeros * cos(1/zeros)), 0))

curve = 7 / (9 - x**2)
check("8", (limit(curve, x, -oo), 0), (limit(curve, x, oo), 0),
      (limit(Abs(curve), x, -3), oo), (limit(Abs(curve), x, -3, dir="-"), oo),
      (limit(Abs(curve), x, 3), oo), (limit(Abs(curve), x, 3, dir="-"), oo))
print(f"SymPy verified {len(checked)} items: {', '.join(checked)}")
