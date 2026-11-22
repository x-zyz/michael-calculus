"""Verify the calculable exercises and counterexamples for JC935 exercise 1-5."""
from sympy import Rational, atan, cos, limit, oo, pi, simplify, sin, summation, symbols

x, h, a = symbols("x h a", real=True)
n, k = symbols("n k", integer=True, positive=True)
checked = []


def check(item, *comparisons):
    for actual, expected in comparisons:
        assert actual == expected or simplify(actual - expected) == 0, (item, actual, expected)
    checked.append("jc935-1-5-" + item)


finite = [
    ((x*x + 8)/(x - 6), 2, -3),
    ((x*x - 4)/(x*x + 5), 2, 0),
    ((x - 3)**2/(x*x - 9), 3, 0),
    ((5*x**3 - x*x + 3*x)/(4*x*x + 2*x), 0, Rational(3, 2)),
    (((a + 2*h)**2 - a*a)/h, 0, 4*a),
    (4 + 2/x - 5/x**2, oo, 4),
    ((5*x*x + 1)/(3*x*x + 2*x - 4), oo, Rational(5, 3)),
    ((2*x*x - x)/(x**4 + 2*x*x + 1), oo, 0),
    ((x*x - 7*x + 10)/(x*x - 6*x + 5), 5, Rational(3, 4)),
    ((2 - 3/x)*(5 + 1/x**2), oo, 10),
    (summation(3**(-k), (k, 0, n)), oo, Rational(3, 2)),
    (summation(2*k, (k, 1, n-1))/(5*n**2), oo, Rational(1, 5)),
    ((n + 2)*(n + 4)*(n + 6)/(7*n**3), oo, Rational(1, 7)),
    (1/(2 - x) - 12/(8 - x**3), 2, Rational(-1, 2)),
]
for i, (expr, approach, expected) in enumerate(finite, 1):
    variable = h if i == 5 else n if 11 <= i <= 13 else x
    sides = ((limit(expr, variable, approach), expected),)
    if approach != oo:
        sides += ((limit(expr, variable, approach, dir="-"), expected),)
    elif variable == x:
        sides += ((limit(expr, variable, -oo), expected),)
    check(f"1-{i}", *sides)

pole = (x**3 + x*x)/(x - 3)**2
check("2-1", (limit(pole, x, 3), oo), (limit(pole, x, 3, dir="-"), oo))
check("2-2", (limit(x*x/(3*x + 5), x, oo), oo))
poly = abs(3*x**3 - 2*x + 5)
check("2-3", (limit(poly, x, oo), oo), (limit(poly, x, -oo), oo))
oscillation = 4*x*x*cos(2/x)
check("3-1", (limit(oscillation, x, 0), 0), (limit(oscillation, x, 0, dir="-"), 0))
ratio = 2*atan(x)/(3*x)
check("3-2", (limit(ratio, x, oo), 0), (limit(ratio, x, -oo), 0))

a_n,b_n=3/n,2-1/n
check("4-1", (limit(a_n,n,oo),0), (limit(b_n,n,oo),2), ((a_n-b_n).subs(n,1),2))
b_n,c_n=2+4/n,n
check("4-2", (limit(b_n,n,oo),2), (limit(c_n,n,oo),oo), ((b_n-c_n).subs(n,1),5))
check("4-3", (limit(1/n**2,n,oo),0), (limit(n,n,oo),oo), (limit(n/n**2,n,oo),0))

f = 3*cos(1/(x-2))
g = -f
first, second = 2+1/(2*k*pi), 2+1/((2*k+1)*pi)
check("5-2", (simplify(f+g),0), (limit(first,k,oo),2), (limit(second,k,oo),2),
      (simplify(f.subs(x,first)),3), (simplify(f.subs(x,second)),-3))
f,g=(x-2)**2,1/(x-2)
check("5-3", (limit(f,x,2),0), (limit(g,x,2,dir="-"),-oo), (limit(g,x,2),oo),
      (limit(f*g,x,2),0))
f = 2+sin(1/(x-1))
first,second=1+1/(2*k*pi+pi/2),1+1/(2*k*pi+3*pi/2)
check("5-4", (simplify(f * (1/f)),1), (limit(first,k,oo),1), (limit(second,k,oo),1),
      (simplify(f.subs(x,first)),3), (simplify(f.subs(x,second)),1))
print(f"SymPy verified {len(checked)} items: {', '.join(checked)}")
