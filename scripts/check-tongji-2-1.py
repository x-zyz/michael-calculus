"""Symbolic checks for the JC935 derivative concept variants."""

from sympy import Abs, Rational, cos, diff, exp, factorial, limit, oo, pi, simplify, sin, solve, sqrt, symbols

x, h, t = symbols("x h t", real=True)
p = symbols("p", positive=True)
a = symbols("a", real=True, nonzero=True)
m, b = symbols("m b", real=True)
n = symbols("n", positive=True, integer=True)
verified = set()


def check(question, *pairs):
    for actual, expected in pairs:
        assert actual == expected or simplify(actual - expected) == 0, (question, actual, expected)
    assert question not in verified, question
    verified.add(question)


def slope(expression, position, value, side):
    return limit((expression - value) / (x - position), x, position, dir=side)


angle = 5*t**2 + t
check("1", *((limit((angle.subs(t, 1+h) - angle.subs(t, 1))/h, h, 0, dir=side), 11)
              for side in ["-", "+"]))
temperature = 22 + 36/(t+1)
check("2", *((limit((temperature.subs(t, 2+h)-temperature.subs(t, 2))/h, h, 0, dir=side), -4)
              for side in ["-", "+"]))
cost = 1200 + 72*x - x**2/5
check("3-1", (diff(cost, x).subs(x, 60), 48))
check("3-2", (cost.subs(x, 61) - cost.subs(x, 60), Rational(239, 5)))
check("4", ((-1)**(n-1)*factorial(n-1)/(2*factorial(n+1)), (-1)**(n-1)/(2*n*(n+1))))
phase = 2*x + pi/4
check("5", *((limit((cos(phase+2*h)-cos(phase))/h, h, 0, dir=side), -2*sin(phase))
              for side in ["-", "+"]))
check("7", (slope(x**2/2, 2, 2, "-"), 2), (slope(x+3, 2, 2, "+"), oo))
check("9-1", (diff(3*x**5, x), 15*x**4))
check("9-2",
      (diff(p**Rational(4, 3), p), Rational(4, 3)*p**Rational(1, 3)),
      (-diff(p**Rational(4, 3), p), -Rational(4, 3)*p**Rational(1, 3)),
      (limit(p**Rational(4, 3)/p, p, 0), 0),
      (limit(p**Rational(4, 3)/(-p), p, 0), 0))
check("9-3", (diff(p**Rational(7, 5), p), Rational(7, 5)*p**Rational(2, 5)))
check("9-4", (diff(2/sqrt(p), p), -p**Rational(-3, 2)))
check("9-5", (diff(5/x**3, x), -15/x**4))
check("9-6",
      (diff(p**2*p**Rational(3, 5), p), Rational(13, 5)*p**Rational(8, 5)),
      (-diff(-p**2*p**Rational(3, 5), p), Rational(13, 5)*p**Rational(8, 5)),
      (limit(p**Rational(13, 5)/p, p, 0), 0),
      (limit((-p**Rational(13, 5))/(-p), p, 0), 0))
check("9-7", (diff(p**3*p**Rational(1, 3)/sqrt(p**5), p), Rational(5, 6)*p**Rational(-1, 6)))
check("10", (diff(2*t**3-t, t).subs(t, 3), 53))
curve = 2*cos(x)
check("12-1", (diff(curve, x).subs(x, pi/6), -1))
check("12-2", (diff(curve, x).subs(x, 3*pi/2), 2))
curve = 3*sin(x)
tangent = -3*(x-pi)
normal = (x-pi)/3
check("13", (curve.subs(x, pi), 0), (tangent.subs(x, pi), 0), (normal.subs(x, pi), 0),
      (diff(curve, x).subs(x, pi), diff(tangent, x)), (diff(tangent, x)*diff(normal, x), -1))
curve = 2*exp(2*x)
check("14", (curve.subs(x, 0), 2), (diff(curve, x).subs(x, 0), 4))
parabola = 2*x**2 + 1
secant = (parabola.subs(x, 5) - parabola.subs(x, -1))/6
roots = solve(diff(parabola, x) - secant, x)
assert roots == [2]
check("15", (secant, 8), (parabola.subs(x, roots[0]), 9))
check("16-1", (limit(Abs(sin(3*x)), x, 0), 0),
      (slope(-sin(3*x), 0, 0, "-"), -3), (slope(sin(3*x), 0, 0, "+"), 3))
check("16-2", *((limit(expr, x, 0, dir=side), 0)
                for expr in [x**3*cos(2/x), x**2*cos(2/x)] for side in ["-", "+"]))
left = x**3/2
right = m*x+b
solution = solve([right.subs(x, 2)-left.subs(x, 2), m-diff(left, x).subs(x, 2)], [m, b])
check("17", (solution[m], 6), (solution[b], -8),
      (slope(right.subs(solution), 2, 4, "+"), slope(left, 2, 4, "-")))
check("18", (slope(-2*(x-1), 1, 0, "-"), -2), (slope((x-1)**2, 1, 0, "+"), 0))
check("19", (slope(sin(3*x), 0, 0, "-"), 3), (slope(3*x+x**2, 0, 0, "+"), 3),
      (diff(sin(3*x), x), 3*cos(3*x)), (diff(3*x+x**2, x), 3+2*x))
curve = 12/x
tangent = curve.subs(x, a) + diff(curve, x).subs(x, a)*(x-a)
intercept = solve(tangent, x)[0]
check("20", (intercept, 2*a), (tangent.subs(x, 0), 24/a),
      (Abs(intercept*tangent.subs(x, 0))/2, 24))

assert len(verified) == 26
print(f"SymPy verified {len(verified)} derivative concept exercises")
