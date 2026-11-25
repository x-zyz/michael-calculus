"""SymPy verification for ch1Sec2to3 guidedHints (Sections 1.2 & 1.3)."""

import math
import sympy as sp

n = sp.Symbol("n", integer=True, positive=True)
k = sp.Symbol("k", integer=True, positive=True)
x = sp.Symbol("x", real=True)
eps = sp.Symbol("eps", positive=True)

checked = []


def ok(pid: str):
    checked.append(pid)


# --- Section 1.2: Sequence Limits ---

# jc935-1-2-1-1: a_n = 3^(-n)
e0 = sp.Integer(3) ** (-n)
e1 = sp.Integer(1) / (sp.Integer(3) ** n)
assert sp.simplify(e0 - e1) == 0
assert sp.simplify(e1.subs(n, n + 1) / e1 - sp.Rational(1, 3)) == 0
assert sp.limit(e1, n, sp.oo) == 0
ok("jc935-1-2-1-1")

# jc935-1-2-1-2: a_n = 4*(-1)^n / n^2
a_even = 4 * (-1) ** (2 * k) / (2 * k) ** 2
a_odd = 4 * (-1) ** (2 * k - 1) / (2 * k - 1) ** 2
assert sp.simplify(a_even - 4 / (2 * k) ** 2) == 0
assert sp.simplify(a_odd - (-4 / (2 * k - 1) ** 2)) == 0
assert sp.limit(4 / n**2, n, sp.oo) == 0
ok("jc935-1-2-1-2")

# jc935-1-2-1-3: a_n = 5 + 2/n^2
a = 5 + sp.Integer(2) / n**2
assert sp.simplify((a - 5) - 2 / n**2) == 0
assert sp.simplify((2 / n**2 - 2 / (n + 1) ** 2) - 2 * (2 * n + 1) / (n**2 * (n + 1) ** 2)) == 0
assert sp.limit(a, n, sp.oo) == 5
ok("jc935-1-2-1-3")

# jc935-1-2-1-4: a_n = (n-2)/(n+2)
e0 = (n - 2) / (n + 2)
e1 = ((n + 2) - 4) / (n + 2)
e2 = 1 - sp.Integer(4) / (n + 2)
assert sp.simplify(e0 - e1) == 0
assert sp.simplify(e1 - e2) == 0
assert sp.limit(e2, n, sp.oo) == 1
ok("jc935-1-2-1-4")

# jc935-1-2-1-5: a_n = 2n(-1)^n
assert sp.simplify(2 * (2 * k) * (-1) ** (2 * k) - 4 * k) == 0
assert sp.simplify(2 * (2 * k - 1) * (-1) ** (2 * k - 1) - (2 - 4 * k)) == 0
assert sp.limit(4 * k, k, sp.oo) == sp.oo
assert sp.limit(2 - 4 * k, k, sp.oo) == -sp.oo
ok("jc935-1-2-1-5")

# jc935-1-2-1-6: a_n = (3^n - 1)/5^n
e0 = (sp.Integer(3) ** n - 1) / sp.Integer(5) ** n
e1 = sp.Rational(3, 5) ** n - sp.Rational(1, 5) ** n
assert sp.simplify(e0 - e1) == 0
assert sp.limit(e1, n, sp.oo) == 0
assert sp.limit(sp.Rational(3, 5) ** n, n, sp.oo) == 0
ok("jc935-1-2-1-6")

# jc935-1-2-1-7: a_n = 2n - 3/n
a = 2 * n - sp.Integer(3) / n
for val in (1, 2, 5, 100):
    assert a.subs(n, val) >= 2 * val - 3
assert sp.limit(2 * n - 3, n, sp.oo) == sp.oo
assert sp.limit(a, n, sp.oo) == sp.oo
ok("jc935-1-2-1-7")

# jc935-1-2-1-8: a_n = (1 + (-1)^n)*(n+2)/n
a_odd = (1 + (-1) ** (2 * k - 1)) * (2 * k - 1 + 2) / (2 * k - 1)
a_even = (1 + (-1) ** (2 * k)) * (2 * k + 2) / (2 * k)
assert sp.simplify(a_odd) == 0
assert sp.simplify(a_even - (2 + sp.Integer(2) / k)) == 0
assert sp.limit(a_even, k, sp.oo) == 2
ok("jc935-1-2-1-8")

# jc935-1-2-2-3: a_n = 3(-1)^n
assert sp.simplify(3 * (-1) ** (2 * k) - 3) == 0
assert sp.simplify(3 * (-1) ** (2 * k - 1) - (-3)) == 0
ok("jc935-1-2-2-3")

# jc935-1-2-4: a_n = (2/n) cos(n*pi/3), N = max(1, floor(2/eps))
for e_val in (2.5, 1.0, 0.1, 0.01, 1e-4):
    N_val = max(1, math.floor(2.0 / e_val))
    for nv in (N_val + 1, N_val + 2, N_val + 10):
        assert abs((2.0 / nv) * math.cos(nv * math.pi / 3.0)) < e_val
assert 2 / sp.Rational(1, 100) == 200
ok("jc935-1-2-4")

# jc935-1-2-5-1: a_n = 4/n^2 -> 0
assert sp.limit(4 / n**2, n, sp.oo) == 0
for e_val in (5.0, 1.0, 0.04, 1e-4):
    N_val = max(1, math.floor(2.0 / math.sqrt(e_val)))
    assert 4.0 / (N_val + 1) ** 2 < e_val
ok("jc935-1-2-5-1")

# jc935-1-2-5-2: a_n = (5n+1)/(3n+1) -> 5/3
e0 = (5 * n + 1) / (3 * n + 1) - sp.Rational(5, 3)
e1 = sp.Integer(-2) / (3 * (3 * n + 1))
assert sp.simplify(e0 - e1) == 0
assert sp.limit((5 * n + 1) / (3 * n + 1), n, sp.oo) == sp.Rational(5, 3)
for e_val in (2.0, 0.5, 0.01, 1e-4):
    N_val = max(1, math.floor(2.0 / (9.0 * e_val)))
    nv = N_val + 1
    assert abs((5 * nv + 1) / (3 * nv + 1) - 5 / 3) < 2.0 / (9.0 * nv) < e_val
ok("jc935-1-2-5-2")

# jc935-1-2-5-3: a_n = sqrt(n^2+8)/n -> 1
e0 = sp.sqrt(n**2 + 8) / n - 1
e1 = (sp.sqrt(n**2 + 8) - n) / n
e2 = sp.Integer(8) / (n * (sp.sqrt(n**2 + 8) + n))
assert sp.simplify(e0 - e1) == 0
assert sp.simplify(e1 - e2) == 0
assert sp.limit(sp.sqrt(n**2 + 8) / n, n, sp.oo) == 1
for e_val in (5.0, 1.0, 0.01, 1e-4):
    N_val = max(1, math.floor(2.0 / math.sqrt(e_val)))
    nv = N_val + 1
    assert abs(math.sqrt(nv**2 + 8) / nv - 1.0) < 4.0 / (nv**2) < e_val
ok("jc935-1-2-5-3")

# jc935-1-2-5-4: a_n = 2 - 10^(-n) -> 2
assert sp.limit(2 - sp.Integer(10) ** (-n), n, sp.oo) == 2
for e_val in (2.0, 0.5, 0.01, 1e-5):
    N_val = max(1, math.floor(math.log10(1.0 / e_val)))
    nv = N_val + 1
    assert 10.0 ** (-nv) < e_val
ok("jc935-1-2-5-4")

# jc935-1-2-6: counterexample a_n = 4(-1)^n
assert sp.simplify(4 * (-1) ** (2 * k) - 4) == 0
assert sp.simplify(4 * (-1) ** (2 * k - 1) - (-4)) == 0
ok("jc935-1-2-6")


# --- Section 1.3: Function Limits ---

# Graph f (jc935-1-3-1-1..3)
assert sp.limit(2 * x + 8, x, -3, "-") == 2
assert sp.limit(-2 * x - 4, x, -3, "+") == 2
ok("jc935-1-3-1-1")

assert sp.limit(-2 * x - 4, x, -1, "-") == -2
assert sp.limit(sp.Integer(-2), x, -1, "+") == -2
ok("jc935-1-3-1-2")

assert sp.limit(sp.Integer(-2), x, 1, "-") == -2
assert sp.limit(sp.Integer(3), x, 1, "+") == 3
ok("jc935-1-3-1-3")

# Graph g (jc935-1-3-2-1..6)
assert sp.limit(x, x, 0, "-") == 0
assert sp.limit(-x, x, 0, "+") == 0
ok("jc935-1-3-2-1")
ok("jc935-1-3-2-2")
ok("jc935-1-3-2-3")

assert sp.limit(-x, x, 2, "-") == -2
assert sp.limit(x - 2, x, 2, "+") == 0
ok("jc935-1-3-2-4")
ok("jc935-1-3-2-5")

a_sym = sp.Symbol("a", real=True)
assert sp.limit(x, x, a_sym) == a_sym
assert sp.limit(-x, x, a_sym) == -a_sym
ok("jc935-1-3-2-6")

# Graph h (jc935-1-3-3-1..8)
h_parab = x**2 / 2 + 1
assert sp.limit(h_parab, x, -2, "+") == 3
ok("jc935-1-3-3-1")
ok("jc935-1-3-3-2")  # undefined for x < -2
assert sp.limit(h_parab, x, 0, "-") == 1
assert sp.limit(h_parab, x, 0, "+") == 1
ok("jc935-1-3-3-3")
ok("jc935-1-3-3-4")
assert sp.limit(h_parab, x, 2, "-") == 3
ok("jc935-1-3-3-5")
assert sp.limit(sp.Integer(0), x, 2, "+") == 0
ok("jc935-1-3-3-6")
assert sp.limit(sp.Integer(0), x, 4, "-") == 0
ok("jc935-1-3-3-7")
ok("jc935-1-3-3-8")  # undefined for x > 4

# jc935-1-3-4-1: f(x) = 3(x-2)/(x-2)
f_expr = 3 * (x - 2) / (x - 2)
assert sp.simplify(f_expr - 3) == 0
assert sp.limit(f_expr, x, 2, "-") == 3
assert sp.limit(f_expr, x, 2, "+") == 3
ok("jc935-1-3-4-1")

# jc935-1-3-4-2: f(x) = 2|x-4|/(x-4)
f_abs = 2 * sp.Abs(x - 4) / (x - 4)
assert sp.limit(f_abs, x, 4, "-") == -2
assert sp.limit(f_abs, x, 4, "+") == 2
ok("jc935-1-3-4-2")

# jc935-1-3-5-1: lim_{x->2} (4x-3) = 5, delta = eps/4
assert sp.simplify((4 * x - 3) - 5 - 4 * (x - 2)) == 0
assert sp.limit(4 * x - 3, x, 2) == 5
assert sp.simplify(4 * (eps / 4) - eps) == 0
ok("jc935-1-3-5-1")

# jc935-1-3-5-2: lim_{x->-1} (2-6x) = 8, delta = eps/6
assert sp.simplify((2 - 6 * x) - 8 - (-6) * (x + 1)) == 0
assert sp.limit(2 - 6 * x, x, -1) == 8
assert sp.simplify(6 * (eps / 6) - eps) == 0
ok("jc935-1-3-5-2")

# jc935-1-3-5-3: lim_{x->-3} (x^2-9)/(x+3) = -6, delta = eps
e0 = (x**2 - 9) / (x + 3)
e1 = x - 3
assert sp.simplify(e0 - e1) == 0
assert sp.simplify((e1 - (-6)) - (x + 3)) == 0
assert sp.limit(e0, x, -3) == -6
ok("jc935-1-3-5-3")

# jc935-1-3-5-4: lim_{x->-1/3} (1-9x^2)/(3x+1) = 2, delta = eps/3
e0 = (1 - 9 * x**2) / (3 * x + 1)
e1 = 1 - 3 * x
assert sp.simplify(e0 - e1) == 0
assert sp.simplify((e1 - 2) - (-3) * (x + sp.Rational(1, 3))) == 0
assert sp.limit(e0, x, -sp.Rational(1, 3)) == 2
ok("jc935-1-3-5-4")

# jc935-1-3-6-1: lim_{|x|->oo} (2+x^3)/(4x^3) = 1/4, X = (1/(2eps))^(1/3)
e0 = (2 + x**3) / (4 * x**3) - sp.Rational(1, 4)
e1 = sp.Integer(1) / (2 * x**3)
assert sp.simplify(e0 - e1) == 0
assert sp.limit((2 + x**3) / (4 * x**3), x, sp.oo) == sp.Rational(1, 4)
assert sp.limit((2 + x**3) / (4 * x**3), x, -sp.oo) == sp.Rational(1, 4)
X_expr = (1 / (2 * eps)) ** sp.Rational(1, 3)
assert sp.simplify(1 / (2 * X_expr**3) - eps) == 0
ok("jc935-1-3-6-1")

# jc935-1-3-6-2: lim_{x->+oo} 3 cos(x)/sqrt(x) = 0, X = (3/eps)^2
X_expr = (3 / eps) ** 2
assert sp.simplify(3 / sp.sqrt(X_expr) - eps) == 0
assert sp.limit(3 / sp.sqrt(x), x, sp.oo) == 0
ok("jc935-1-3-6-2")

# jc935-1-3-7: |x^2-9| < 0.014, delta = 0.002
assert sp.simplify((x**2 - 9) - (x - 3) * (x + 3)) == 0
delta_val = sp.Rational(14, 1000) / 7
assert delta_val == sp.Rational(2, 1000)
assert delta_val <= 1
for xv in (3 - 0.001999, 3 + 0.001999):
    assert abs(xv**2 - 9) < 0.014
ok("jc935-1-3-7")

# jc935-1-3-8: |(x^2-2)/(x^2+7) - 1| < 0.01, X = 30
e0 = (x**2 - 2) / (x**2 + 7) - 1
e1 = sp.Integer(-9) / (x**2 + 7)
assert sp.simplify(e0 - e1) == 0
assert sp.Rational(9, 30**2) == sp.Rational(1, 100)
for xv in (-30.0001, 30.0001, 100.0):
    assert abs((xv**2 - 2) / (xv**2 + 7) - 1) < 9.0 / (xv**2) < 0.01
ok("jc935-1-3-8")

# jc935-1-3-9: lim_{x->2} |3(x-2)| = 0, delta = eps/3
assert sp.limit(sp.Abs(3 * (x - 2)), x, 2) == 0
assert sp.simplify(3 * (eps / 3) - eps) == 0
ok("jc935-1-3-9")

print(f"All {len(checked)} computable/graph checks in ch1Sec2to3 PASSED.")
