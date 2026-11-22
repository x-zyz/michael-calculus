"""Check the identities and both sides of the P8 limit with SymPy."""

from sympy import exp, limit, log, simplify, symbols

x = symbols("x", real=True)
assert simplify(2 / x - (-6) / (-3 * x)) == 0
# The base is positive when |x| < 1/3, and the fractions require x != 0.
for side in ("-", "+"):
    assert limit((1 - 3 * x) ** (1 / (-3 * x)), x, 0, dir=side) == exp(1)
    assert limit((1 - 3 * x) ** (2 / x), x, 0, dir=side) == exp(-6)
assert log(exp(-6)) == -6
print("P8: both one-sided limits verified; k = -6")
