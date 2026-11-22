"""Symbolic checks for the numerical and expression results in JC935 1-8 to 1-10."""
from sympy import (
    Abs, Piecewise, Poly, Rational, cos, cot, exp, limit, log, oo, pi,
    simplify, sin, sqrt, symbols, tan,
)

x, a = symbols("x a", real=True)
k = symbols("k", integer=True, positive=True)
checked = set()


def check(item, *results):
    for actual, expected in results:
        assert actual == expected or simplify(actual - expected) == 0, (item, actual, expected)
    assert item not in checked
    checked.add(item)


check("1-8-2-1", (limit(x*x, x, 2, dir="-"), 4), (limit(6-x, x, 2), 4))
check("1-8-2-2", (limit(x+1, x, -2), -1), (limit(x+1, x, 2, dir="-"), 3))
f = (x*x - 9) / ((x - 3)*(x - 4))
check("1-8-3-1", (limit(f, x, 3, dir="-"), -6), (limit(f, x, 3), -6),
      (limit(Abs(f), x, 4, dir="-"), oo), (limit(Abs(f), x, 4), oo))
# Center changes of variable at all the special angles using tan's period.
f = x / tan(2*x)
check("1-8-3-2", (limit(f, x, 0), Rational(1, 2)), (limit(f, x, 0, dir="-"), Rational(1, 2)),
      (limit(simplify((x+k*pi/2)/tan(2*x)), x, 0), oo),
      (limit(simplify((x+k*pi/2)/tan(2*x)), x, 0, dir="-"), -oo),
      (limit((x+pi/4+k*pi/2)*cos(2*x+pi/2+k*pi)/sin(2*x+pi/2+k*pi), x, 0), 0))
first, second = 2/(k*pi), 2/((k+Rational(1, 2))*pi)
check("1-8-3-3", (limit(first, k, oo), 0), (limit(second, k, oo), 0),
      (simplify(cos(2/first)**2), 1), (simplify(cos(2/second)**2), 0))
check("1-8-3-4", (limit(2*x-4, x, 2, dir="-"), 0), (limit(5-x, x, 2), 3))
check("1-8-5-2", (Abs(Piecewise((-2, x < 3), (2, True))), 2))

f = (x*x - 4)/(x - 3)
check("1-9-1", (f.subs(x, 0), Rational(4, 3)), (limit(f, x, -5), Rational(-21, 8)),
      (limit(f, x, -5, dir="-"), Rational(-21, 8)),
      (limit(f, x, 3, dir="-"), -oo), (limit(f, x, 3), oo))
cases = {
    "3-1": (sqrt(x*x-4*x+7), 1, 2),
    "3-2": (sin(3*x)**5, pi/6, 1),
    "3-3": (log(4*cos(2*x)), pi/6, log(2)),
    "3-4": ((sqrt(1+6*x)-1)/x, 0, 3),
    "3-5": ((sqrt(7*x-6)-sqrt(x))/(x-1), 1, 3),
    "3-6": ((sin(2*x)-sin(2*a))/(x-a), a, 2*cos(2*a)),
    "3-7": (sqrt(x*x+3*x)-sqrt(x*x-x), oo, 2),
    "3-8": (((1-3*x*x)**Rational(2, 3)-1)/(x*log(1+2*x)), 0, -1),
    "4-2": (log(sin(3*x)/(3*x)), 0, 0),
    "4-3": ((1+2/x)**(3*x/4), oo, exp(Rational(3, 2))),
    "4-4": ((1+2*tan(x)**2)**(3*cot(x)**2), 0, exp(6)),
    "4-5": (((x+4)/(x+7))**(2*x+1), oo, exp(-6)),
    "4-6": ((sqrt(1+tan(x))-sqrt(1+sin(x)))/(x*(sqrt(1+4*sin(x)**2)-1)), 0, Rational(1, 8)),
    "4-7": ((log(x)-log(3))/(x-3), 3, Rational(1, 3)),
    "4-8": ((exp(5*x)-exp(3*x)-exp(2*x)+1)/((1-4*x*x)**Rational(1, 3)-1), 0, Rational(-9, 2)),
    "4-9": (x*(exp(2/x)-1), oo, 2),
}
for ref,(formula, point, answer) in cases.items():
    directions = ("+", "-") if point != oo else ("+",)
    check("1-9-"+ref, *((limit(formula, x, point, dir=direction), answer) for direction in directions))
check("1-9-4-1", (limit(exp(3/x), x, oo), 1), (limit(exp(3/x), x, -oo), 1))
f = (x+2)*exp(1/(x-2))
check("1-9-4-10", (limit(f, x, 2, dir="-"), 0), (limit(f, x, 2), oo))
check("1-9-5-1", (Piecewise((-1, exp(2*x) < 0), (4, True)), 4))
check("1-9-5-3", (simplify(Piecewise((-2, x < 0), (2, True))**2+1), 5))
check("1-9-6", (limit(exp(2*(x-3)), x, 3, dir="-"), 1), (limit(a+(x-3)**2, x, 3), a))

poly = Poly(x**5-2*x-4, x)
check("1-10-2", (poly.eval(1), -5), (poly.eval(2), 24))
poly = Poly(x**3-7*x+2, x)
check("1-10-5", *((poly.eval(t), y) for t, y in zip((-3,-2,0,1,2,3),(-4,8,2,-4,-4,8))),
      *((poly.count_roots(left, right), 1) for left, right in [(-3,-2),(0,1),(2,3)]))

assert len(checked) == 31, checked
print(f"SymPy verified {len(checked)} exercises")
