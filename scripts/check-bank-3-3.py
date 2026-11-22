"""Symbolic and numerical checks for the JC935 Section 3-3 (Taylor formula) variants."""

from sympy import (
    Rational,
    asin,
    cos,
    diff,
    exp,
    factorial,
    limit,
    log,
    oo,
    pi,
    series,
    simplify,
    sin,
    sqrt,
    symbols,
    tan,
)

x, xi = symbols("x xi", real=True)
x_pos, xi_pos = symbols("x_pos xi_pos", positive=True)

verified = set()


def check(question, *pairs):
    for actual, expected in pairs:
        diff_expr = actual - expected
        assert actual == expected or simplify(diff_expr) == 0, (
            question,
            actual,
            expected,
        )
    assert question not in verified, question
    verified.add(question)


# Q1: Expand f(x) = x^4 - 3x^3 + 4x^2 - 2x + 5 in powers of (x - 3)
f1 = x**4 - 3 * x**3 + 4 * x**2 - 2 * x + 5
f1_exp = 35 + 49 * (x - 3) + 31 * (x - 3) ** 2 + 9 * (x - 3) ** 3 + (x - 3) ** 4
check(
    "3-3-1",
    (f1, f1_exp),
    (f1.subs(x, 3), 35),
    (diff(f1, x, 1).subs(x, 3), 49),
    (diff(f1, x, 2).subs(x, 3), 62),
    (diff(f1, x, 3).subs(x, 3), 54),
    (diff(f1, x, 4).subs(x, 3), 24),
)

# Q2: Maclaurin expansion of f(x) = (2x^2 - x + 1)^3
f2 = (2 * x**2 - x + 1) ** 3
f2_exp = 1 - 3 * x + 9 * x**2 - 13 * x**3 + 18 * x**4 - 12 * x**5 + 8 * x**6
check(
    "3-3-2",
    (f2, f2_exp),
    (f2.subs(x, 0), 1),
    (diff(f2, x, 1).subs(x, 0), -3),
    (diff(f2, x, 2).subs(x, 0), 18),
    (diff(f2, x, 3).subs(x, 0), -78),
    (diff(f2, x, 4).subs(x, 0), 432),
    (diff(f2, x, 5).subs(x, 0), -1440),
    (diff(f2, x, 6).subs(x, 0), 5760),
    (diff(f2, x, 7), 0),
)

# Q3: 3rd-order Taylor formula of f(x) = 1/sqrt(x) (x > 0) at x = 4 with Lagrange remainder
f3 = 1 / sqrt(x_pos)
t3_poly = (
    Rational(1, 2)
    - Rational(1, 16) * (x_pos - 4)
    + Rational(3, 256) * (x_pos - 4) ** 2
    - Rational(5, 2048) * (x_pos - 4) ** 3
)
t3_sym = series(f3, x_pos, 4, 4).removeO()
r3_coeff = diff(f3, x_pos, 4).subs(x_pos, xi_pos) / factorial(4)
check(
    "3-3-3",
    (t3_sym, t3_poly),
    (r3_coeff, Rational(35, 128) / xi_pos ** Rational(9, 2)),
)

# Q4: n-th order Taylor formula of f(x) = ln(2x + 1) (x > -1/2) at x = 1 with Peano remainder
f4 = log(2 * x + 1)
f4_pairs = [(f4.subs(x, 1), log(3))]
for k in range(1, 9):
    dk = diff(f4, x, k)
    expected_dk = (-1) ** (k - 1) * factorial(k - 1) * 2**k / (2 * x + 1) ** k
    f4_pairs.append((dk, expected_dk))
    f4_pairs.append(
        (dk.subs(x, 1) / factorial(k), (-1) ** (k - 1) * Rational(2**k, k * 3**k))
    )
t4_sym = series(f4, x, 1, 5).removeO()
t4_expected = (
    log(3)
    + Rational(2, 3) * (x - 1)
    - Rational(2, 9) * (x - 1) ** 2
    + Rational(8, 81) * (x - 1) ** 3
    - Rational(4, 81) * (x - 1) ** 4
)
f4_pairs.append((t4_sym, t4_expected))
check("3-3-4", *f4_pairs)

# Q5: n-th order Taylor formula of f(x) = 1/x (x > 0) at x = 2 with Lagrange remainder
f5 = 1 / x_pos
f5_pairs = [(f5.subs(x_pos, 2), Rational(1, 2))]
for k in range(1, 9):
    dk = diff(f5, x_pos, k)
    expected_dk = (-1) ** k * factorial(k) / x_pos ** (k + 1)
    f5_pairs.append((dk, expected_dk))
    f5_pairs.append((dk.subs(x_pos, 2) / factorial(k), (-1) ** k / Rational(2 ** (k + 1))))
    # Lagrange remainder coefficient for (k-1)-th order formula is f^(k)(xi) / k!
    f5_pairs.append((dk.subs(x_pos, xi_pos) / factorial(k), (-1) ** k / xi_pos ** (k + 1)))
check("3-3-5", *f5_pairs)

# Q6: 3rd-order Maclaurin formula of f(x) = arcsin(x) with Peano remainder
f6 = asin(x)
t6_sym = series(f6, x, 0, 4).removeO()
check(
    "3-3-6",
    (t6_sym, x + x**3 / 6),
    (f6.subs(x, 0), 0),
    (diff(f6, x, 1).subs(x, 0), 1),
    (diff(f6, x, 2).subs(x, 0), 0),
    (diff(f6, x, 3).subs(x, 0), 1),
)

# Q7: n-th order Maclaurin formula of f(x) = x * e^(2x) with Peano remainder
f7 = x * exp(2 * x)
f7_pairs = [(f7.subs(x, 0), 0)]
for k in range(1, 9):
    dk = diff(f7, x, k)
    expected_dk = 2 ** (k - 1) * (2 * x + k) * exp(2 * x)
    f7_pairs.append((dk, expected_dk))
    f7_pairs.append((dk.subs(x, 0) / factorial(k), Rational(2 ** (k - 1), factorial(k - 1))))
t7_sym = series(f7, x, 0, 6).removeO()
t7_expected = x + 2 * x**2 + 2 * x**3 + Rational(4, 3) * x**4 + Rational(2, 3) * x**5
f7_pairs.append((t7_sym, t7_expected))
check("3-3-7", *f7_pairs)

# Q8: Error bound for e^(-x) ≈ 1 - x + x^2/2 - x^3/6 on 0 < x <= 1/2, and approx of e^(-1/2)
f8 = exp(-x)
t8_sym = series(f8, x, 0, 4).removeO()
t8_poly = 1 - x + x**2 / 2 - x**3 / 6
r8_coeff = diff(f8, x, 4).subs(x, xi) / factorial(4)
bound8 = Rational(1, 24) * Rational(1, 2) ** 4
approx8_exact = t8_poly.subs(x, Rational(1, 2))
check(
    "3-3-8",
    (t8_sym, t8_poly),
    (r8_coeff, exp(-xi) / 24),
    (bound8, Rational(1, 384)),
    (approx8_exact, Rational(29, 48)),
)
assert float(bound8) < 0.005
err8_frac = abs(float(exp(-Rational(1, 2)).evalf()) - float(approx8_exact))
err8_dec = abs(float(exp(-Rational(1, 2)).evalf()) - 0.604)
assert err8_frac < float(bound8) < 0.005
assert err8_dec < 0.005

# Q9(1): 3rd-order Taylor approximation of sqrt(26) = 5 * sqrt(1 + 1/25)
f9_1 = sqrt(1 + x)
t9_1_sym = series(f9_1, x, 0, 4).removeO()
t9_1_poly = 1 + x / 2 - x**2 / 8 + x**3 / 16
r9_1_coeff = diff(f9_1, x, 4).subs(x, xi) / factorial(4)
approx9_1 = 5 * t9_1_poly.subs(x, Rational(1, 25))
bound9_1 = 5 * Rational(5, 128) * Rational(1, 25) ** 4
check(
    "3-3-9-1",
    (t9_1_sym, t9_1_poly),
    (r9_1_coeff, -Rational(5, 128) * (1 + xi) ** (-Rational(7, 2))),
    (approx9_1, Rational(254951, 50000)),
    (bound9_1, Rational(5, 10**7)),
)
assert float(approx9_1) == 5.09902
err9_1 = abs(float(sqrt(26).evalf()) - float(approx9_1))
assert err9_1 < float(bound9_1)

# Q9(2): 3rd-order Taylor approximation of sin(15 deg) = sin(pi/12)
f9_2 = sin(x)
t9_2_sym = series(f9_2, x, 0, 5).removeO()
t9_2_poly = x - x**3 / 6
x9_2 = pi / 12
approx9_2_expr = t9_2_poly.subs(x, x9_2)
approx9_2_val = float(approx9_2_expr.evalf())
exact9_2_val = float(sin(x9_2).evalf())
bound9_2_r4 = float((x9_2**5 / factorial(5)).evalf())
bound9_2_r3 = float((x9_2**4 / factorial(4)).evalf())
check(
    "3-3-9-2",
    (t9_2_sym, t9_2_poly),
    (diff(f9_2, x, 5).subs(x, xi) / factorial(5), cos(xi) / 120),
)
assert abs(approx9_2_val - 0.258809) < 2e-7
assert abs(exact9_2_val - approx9_2_val) < bound9_2_r4 < 1.03e-5
assert abs(exact9_2_val - 0.258809) < bound9_2_r4
assert bound9_2_r4 < bound9_2_r3

# Q10(1): lim_{x -> +oo} ((x^3 + 6x^2)^(1/3) - sqrt(x^2 - 5x)) = 9/2
lim10_1 = limit((x_pos**3 + 6 * x_pos**2) ** Rational(1, 3) - sqrt(x_pos**2 - 5 * x_pos), x_pos, oo)
check("3-3-10-1", (lim10_1, Rational(9, 2)))

# Q10(2): lim_{x -> 0} (cos(2x) - e^(-2x^2)) / (x^2 * (ln(1 + x) - x)) = 8/3
lim10_2 = limit((cos(2 * x) - exp(-2 * x**2)) / (x**2 * (log(1 + x) - x)), x, 0)
check("3-3-10-2", (lim10_2, Rational(8, 3)))

# Q10(3): lim_{x -> 0} (sqrt(1 + 2x^2) - 1 - x^2) / ((e^(2x^2) - cos(x)) * tan(x^2)) = -1/5
lim10_3 = limit((sqrt(1 + 2 * x**2) - 1 - x**2) / ((exp(2 * x**2) - cos(x)) * tan(x**2)), x, 0)
check("3-3-10-3", (lim10_3, -Rational(1, 5)))

# Q10(4): lim_{x -> oo} (x^2 * ln(1 - 3/x) + 3x) = -9/2 (both +oo and -oo)
expr10_4 = x**2 * log(1 - 3 / x) + 3 * x
check(
    "3-3-10-4",
    (limit(expr10_4, x, oo), -Rational(9, 2)),
    (limit(expr10_4, x, -oo), -Rational(9, 2)),
)

# Q11 (manual proof sanity checks on concrete functions satisfying f''(x) < 0 and lim_{x->1} (f(x)-2)/(x-1) = 3)
for sample_f in [3 * x - 1 - (x - 1) ** 2, 4 * x - 1 - exp(x - 1)]:
    assert simplify(sample_f.subs(x, 1) - 2) == 0
    assert simplify(limit((sample_f - 2) / (x - 1), x, 1) - 3) == 0
    assert simplify(diff(sample_f, x, 1).subs(x, 1) - 3) == 0
    for pt in [-3, -1, 0, Rational(1, 2), 1, 2, 5]:
        assert float(diff(sample_f, x, 2).subs(x, pt)) < 0
        assert float((sample_f - (3 * x - 1)).subs(x, pt)) <= 1e-12

assert len(verified) == 14, f"Expected 14 symbolic checks, got {len(verified)}"
print(f"Verified {len(verified)} symbolic items (+ Q11 proof sanity checks) in JC935 Section 3-3.")
print(f"  Q8: bound={float(bound8):.6f}, 29/48={float(approx8_exact):.6f}, exact={float(exp(-Rational(1,2)).evalf()):.6f}")
print(f"  Q9(1): approx={float(approx9_1):.6f}, exact={float(sqrt(26).evalf()):.7f}, bound={float(bound9_1):.2e}")
print(f"  Q9(2): approx={approx9_2_val:.7f}, exact={exact9_2_val:.7f}, |R4|<={bound9_2_r4:.3e}")
