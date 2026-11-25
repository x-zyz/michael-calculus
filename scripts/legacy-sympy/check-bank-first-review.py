"""Symbolic checks for JC935 chapter-one review exercises."""
from sympy import (
    Interval, Rational, cos, cot, exp, limit, log, oo, pi, simplify, sin,
    solve_univariate_inequality, sqrt, symbols, tan,
)

x, u, angle, radius = symbols("x u angle radius", real=True)
a = symbols("a", real=True)
checked = set()


def check(ref, *pairs):
    for actual, expected in pairs:
        assert actual == expected or simplify(actual - expected) == 0, (ref, actual, expected)
    checked.add(ref)


check("2", (limit(cos(2*x)**(-3*x*x), x, 0, dir="-"), 1),
      (limit(cos(2*x)**(-3*x*x), x, 0), 1))
check("3-1", (limit((4**x+5**x-2)/x, x, 0), log(20)),
      (limit((4**x+5**x-2)/x, x, 0, dir="-"), log(20)))
f = (exp(2/x)-3)/(exp(2/x)+3)
check("3-2", (limit(f, x, 0, dir="-"), -1), (limit(f, x, 0), 1))
check("4-1", (solve_univariate_inequality(2**x <= 4, x, relational=False), Interval(-oo, 2)),
      (solve_univariate_inequality(2**x > 0, x, relational=False), Interval(-oo, oo)))
check("4-2", (log(exp(-1)), -1), (log(exp(2)), 2),
      (solve_univariate_inequality(log(x) >= -1, x, relational=False)
       .intersect(solve_univariate_inequality(log(x) <= 2, x, relational=False)),
       Interval(exp(-1), exp(2))))
check("4-3", (solve_univariate_inequality(x >= 0, x, relational=False)
       .intersect(solve_univariate_inequality(x <= tan(pi/3), x, relational=False)),
       Interval(0, sqrt(3))), (tan(pi/3), sqrt(3)))
check("7", ((2*pi*radius - 4*angle).subs(radius, 2*angle/pi), 0),
      (simplify((16-radius**2).subs(radius, 2*angle/pi)), 16-4*angle**2/pi**2))
f = (x*x-x-12)/(x-4)
check("8", (simplify(f), x+3), (limit(f, x, 4), 7), (limit(f, x, 4, dir="-"), 7))
cases = {
    "9-1": ((x*x-x+2)/(x-2)**2, 2, oo),
    "9-2": (x*(sqrt(x*x+6)-x), oo, 3),
    "9-3": (((x+5)/(x+2))**(x+3), oo, exp(3)),
    "9-4": ((tan(3*x)-sin(3*x))/x**3, 0, Rational(27, 2)),
    "9-5": (((2**x+5**x+20**x)/3)**(1/x), 0, 200**Rational(1, 3)),
    "9-6": (cos(x)**cot(x), 0, 1),
    "9-7": ((log(x)-log(4))/(x-4), 4, Rational(1, 4)),
    "9-8": (x*tan(2*x)/(sqrt(1-3*x*x)-1), 0, Rational(-4, 3)),
}
for ref, (expr, center, answer) in cases.items():
    directions = ("+", "-") if center != oo else ("+",)
    check(ref, *((limit(expr, x, center, dir=direction), answer) for direction in directions))
check("10", (limit(a+u**2, u, 0, dir="-"), a), (limit(3*u*cos(1/u), u, 0), 0))
f = 2*sin(x)+x-1
check("13", (f.subs(x, -pi/2), -3-pi/2), (f.subs(x, pi/2), 1+pi/2))
f = (3*x-2)*exp(2/x)
check("14-2", (limit(f/x, x, oo), 3), (limit(f-3*x, x, oo), 4))
f = x*log(3+2/x)
check("14-3", (limit(f, x, Rational(-2, 3), dir="-"), oo), (limit(f, x, 0), 0),
      (limit(f/x, x, oo), log(3)), (limit(f/x, x, -oo), log(3)),
      (limit(f-x*log(3), x, oo), Rational(2, 3)),
      (limit(f-x*log(3), x, -oo), Rational(2, 3)))

assert len(checked) == 20, checked
print(f"SymPy verified {len(checked)} chapter-one review exercises")
