"""Check calculable results in JC935 exercises 1-6 and 1-7 with SymPy."""
from sympy import Rational, atan, cos, cot, exp, limit, oo, sec, sin, sqrt, symbols, tan

x, a, b, k = symbols("x a b k", real=True)
n = symbols("n", positive=True, integer=True)

CASES = {
    "1-6-1-1": (sin(a * (x - 2)) / (x - 2), x, 2, a),
    "1-6-1-2": (tan(5*x) / (2*x), x, 0, Rational(5, 2)),
    "1-6-1-3": (sin(3*x) / sin(7*x), x, 0, Rational(3, 7)),
    "1-6-1-4": (x*cot(4*x), x, 0, Rational(1, 4)),
    "1-6-1-5": ((1-cos(4*x)) / (x*sin(2*x)), x, 0, 4),
    # Substitute x = 5**(-n); the continuous limit also bounds its subsequence.
    "1-6-1-6": (sin(b*x) / x, x, 0, b),
    "1-6-2-1": ((1-3*x)**(1/x), x, 0, exp(-3)),
    "1-6-2-2": ((1+4*x)**(2/x), x, 0, exp(8)),
    "1-6-2-3": (((x+3)/x)**(2*x), x, oo, exp(6)),
    "1-6-2-4": ((1-2/x)**(k*x), x, oo, exp(-2*k)),
    "1-6-4-1": (sqrt(1+3/n), n, oo, 1),
    "1-6-4-3": ((1+2*x)**Rational(1, 4), x, 0, 1),
    "1-7-1": ((2*x**2-x**3)/(3*x+x**2), x, 0, 0),
    "1-7-2": ((1-cos(2*x))**2 / sin(x)**2, x, 0, 0),
    "1-7-3-1": ((x-2)/(x**3-8), x, 2, Rational(1, 12)),
    "1-7-3-2": (4*(x-2)/(x*x-4), x, 2, 1),
    "1-7-4-1": (atan(4*x)/(4*x), x, 0, 1),
    "1-7-4-2": ((sec(3*x)-1)/(Rational(9, 2)*x*x), x, 0, 1),
    "1-7-5-1": (tan(7*x)/(4*x), x, 0, Rational(7, 4)),
    "1-7-5-3": ((tan(2*x)-sin(2*x))/sin(x)**3, x, 0, 4),
    "1-7-5-4": (
        (sin(2*x)-tan(2*x)) /
        (((1+2*x*x)**Rational(1, 3)-1) * (sqrt(1+3*sin(x))-1)),
        x, 0, -4,
    ),
}

for item, (expression, variable, approach, answer) in CASES.items():
    for direction in ("+", "-") if approach != oo else ("+",):
        actual = limit(expression, variable, approach, dir=direction)
        assert actual == answer, (item, direction, actual, answer)

print(f"SymPy verified {len(CASES)} exercises")
