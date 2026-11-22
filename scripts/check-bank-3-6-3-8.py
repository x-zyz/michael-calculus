"""Symbolic and numerical verification for JC935 Sections 3-6, 3-7, and 3-8 variants."""

from sympy import (
    Abs,
    Rational,
    cbrt,
    cos,
    cosh,
    cot,
    csc,
    diff,
    exp,
    expand_trig,
    limit,
    log,
    nsolve,
    oo,
    pi,
    simplify,
    sin,
    sinh,
    solve,
    sqrt,
    symbols,
    trigsimp,
)

x, y, t = symbols("x y t", real=True)
a, k = symbols("a k", positive=True)
c = symbols("c", real=True)
t0 = symbols("t0", positive=True)

verified = set()


def check(item_id, *pairs):
    for actual, expected in pairs:
        diff_expr = actual - expected
        assert (
            actual == expected
            or simplify(diff_expr) == 0
            or trigsimp(diff_expr) == 0
            or simplify(expand_trig(diff_expr.subs(t, 2 * t))) == 0
        ), (
            item_id,
            actual,
            expected,
        )
    assert item_id not in verified, item_id
    verified.add(item_id)


# ===== 习题 3-6: 函数图形的描绘 (5 题) =====

# 3-6-1: y = (1/4)x^4 - x^3 + 4x + 1
f361 = Rational(1, 4) * x**4 - x**3 + 4 * x + 1
df361 = diff(f361, x)
d2f361 = diff(df361, x)
check(
    "jc935-3-6-1",
    (df361, (x + 1) * (x - 2) ** 2),
    (d2f361, 3 * x * (x - 2)),
    (f361.subs(x, -1), Rational(-7, 4)),
    (f361.subs(x, 0), 1),
    (f361.subs(x, 2), 5),
    (limit(f361, x, oo), oo),
    (limit(f361, x, -oo), oo),
)
assert set(solve(df361, x)) == {-1, 2}
assert set(solve(d2f361, x)) == {0, 2}
assert df361.subs(x, -2) < 0 and df361.subs(x, 0) > 0 and df361.subs(x, 3) > 0
assert d2f361.subs(x, -1) > 0 and d2f361.subs(x, 1) < 0 and d2f361.subs(x, 3) > 0

# 3-6-2: y = 4x / (x^2 + 4)
f362 = 4 * x / (x**2 + 4)
df362 = diff(f362, x)
d2f362 = diff(df362, x)
check(
    "jc935-3-6-2",
    (f362.subs(x, -x) + f362, 0),  # odd function
    (df362, 4 * (4 - x**2) / (x**2 + 4) ** 2),
    (d2f362, 8 * x * (x**2 - 12) / (x**2 + 4) ** 3),
    (f362.subs(x, 2), 1),
    (f362.subs(x, -2), -1),
    (f362.subs(x, 0), 0),
    (f362.subs(x, 2 * sqrt(3)), sqrt(3) / 2),
    (f362.subs(x, -2 * sqrt(3)), -sqrt(3) / 2),
    (limit(f362, x, oo), 0),
    (limit(f362, x, -oo), 0),
)
assert set(solve(df362, x)) == {-2, 2}
assert set(solve(d2f362, x)) == {0, -2 * sqrt(3), 2 * sqrt(3)}

# 3-6-3: y = exp(-(x+1)^2 / 2)
f363 = exp(-((x + 1) ** 2) / 2)
df363 = diff(f363, x)
d2f363 = diff(df363, x)
check(
    "jc935-3-6-3",
    (f363.subs(x, -2 - x) - f363, 0),  # symmetric about x = -1
    (df363, -(x + 1) * f363),
    (d2f363, x * (x + 2) * f363),
    (f363.subs(x, -1), 1),
    (f363.subs(x, -2), exp(Rational(-1, 2))),
    (f363.subs(x, 0), exp(Rational(-1, 2))),
    (limit(f363, x, oo), 0),
    (limit(f363, x, -oo), 0),
)
assert solve(df363, x) == [-1]
assert set(solve(d2f363, x)) == {-2, 0}

# 3-6-4: y = x^2 - 8/x
f364 = x**2 - 8 / x
df364 = diff(f364, x)
d2f364 = diff(df364, x)
x_min364 = -cbrt(4)
check(
    "jc935-3-6-4",
    (df364, 2 * (x**3 + 4) / x**2),
    (d2f364, 2 * (x**3 - 8) / x**3),
    (df364.subs(x, x_min364), 0),
    (f364.subs(x, x_min364), 6 * cbrt(2)),
    (d2f364.subs(x, 2), 0),
    (f364.subs(x, 2), 0),
    (limit(f364, x, 0, dir="-"), oo),
    (limit(f364, x, 0, dir="+"), -oo),
    (limit(f364 / x, x, oo), oo),
    (limit(f364 / x, x, -oo), -oo),
)
assert float(d2f364.subs(x, x_min364)) > 0
assert d2f364.subs(x, 1) < 0 and d2f364.subs(x, 3) > 0

# 3-6-5: y = sin(x) / cos(2x)
f365 = sin(x) / cos(2 * x)
df365 = diff(f365, x)
d2f365 = diff(df365, x)
check(
    "jc935-3-6-5",
    (f365.subs(x, -x) + f365, 0),  # odd
    (f365.subs(x, x + 2 * pi) - f365, 0),  # period 2*pi
    (df365, cos(x) * (3 - 2 * cos(x) ** 2) / cos(2 * x) ** 2),
    (d2f365, sin(x) * (3 + 12 * cos(x) ** 2 - 4 * cos(x) ** 4) / cos(2 * x) ** 3),
    (df365.subs(x, pi / 2), 0),
    (f365.subs(x, pi / 2), -1),
    (d2f365.subs(x, 0), 0),
    (f365.subs(x, 0), 0),
    (d2f365.subs(x, pi), 0),
    (f365.subs(x, pi), 0),
    (limit(f365, x, pi / 4, dir="-"), oo),
    (limit(f365, x, pi / 4, dir="+"), -oo),
    (limit(f365, x, 3 * pi / 4, dir="-"), -oo),
    (limit(f365, x, 3 * pi / 4, dir="+"), oo),
)
assert float(d2f365.subs(x, pi / 2)) < 0  # local max at pi/2


# ===== 习题 3-7: 曲率 (11 题) =====

# 3-7-1: 9x^2 + 4y^2 = 36 at (0, 3)
y371 = sqrt((36 - 9 * x**2) / 4)
dy371 = diff(y371, x)
d2y371 = diff(dy371, x)
K371 = Abs(d2y371) / (1 + dy371**2) ** Rational(3, 2)
check(
    "jc935-3-7-1",
    (y371.subs(x, 0), 3),
    (dy371.subs(x, 0), 0),
    (d2y371.subs(x, 0), Rational(-3, 4)),
    (K371.subs(x, 0), Rational(3, 4)),
)

# 3-7-2: y = ln(sin x), 0 < x < pi
xp = symbols("xp", positive=True)
y372 = log(sin(xp))
dy372 = diff(y372, xp)
d2y372 = diff(dy372, xp)
# On (0, pi), sin(xp) > 0, so (1 + cot^2 xp)^(3/2) = csc^3 xp
check(
    "jc935-3-7-2",
    (dy372, cot(xp)),
    (d2y372, -csc(xp) ** 2),
    (csc(xp) ** 2 / csc(xp) ** 3, sin(xp)),
    (1 / sin(xp), csc(xp)),
)
# Spot-check numeric values in (0, pi)
for val in [pi / 6, pi / 4, pi / 3, 2 * pi / 3]:
    K_num = simplify(Abs(d2y372.subs(xp, val)) / (1 + dy372.subs(xp, val) ** 2) ** Rational(3, 2))
    assert simplify(K_num - sin(val)) == 0

# 3-7-3: y = 2x^2 - 12x + 15 at vertex
y373 = 2 * x**2 - 12 * x + 15
dy373 = diff(y373, x)
d2y373 = diff(dy373, x)
v373 = solve(dy373, x)[0]
K373 = (Abs(d2y373) / (1 + dy373**2) ** Rational(3, 2)).subs(x, v373)
check(
    "jc935-3-7-3",
    (v373, 3),
    (y373.subs(x, v373), -3),
    (K373, 4),
    (1 / K373, Rational(1, 4)),
)

# 3-7-4: cycloid x = a(t - sin t), y = a(1 - cos t), a > 0, 0 < t0 < 2*pi
x374 = a * (t - sin(t))
y374 = a * (1 - cos(t))
dx374 = diff(x374, t)
dy374 = diff(y374, t)
d2x374 = diff(dx374, t)
d2y374 = diff(dy374, t)
dydx374 = simplify(dy374 / dx374)
d2ydx2_374 = simplify(diff(dydx374, t) / dx374)
num374 = simplify(dx374 * d2y374 - dy374 * d2x374)
den374 = simplify(dx374**2 + dy374**2)
check(
    "jc935-3-7-4",
    (dydx374, cot(t / 2)),
    (d2ydx2_374, -1 / (4 * a * sin(t / 2) ** 4)),
    (num374, -2 * a**2 * sin(t / 2) ** 2),
    (den374, 4 * a**2 * sin(t / 2) ** 2),
    (2 * a**2 * sin(t0 / 2) ** 2 / (8 * a**3 * sin(t0 / 2) ** 3), 1 / (4 * a * sin(t0 / 2))),
)
# Numeric spot-check for 0 < t0 < 2*pi
for val in [pi / 3, pi / 2, pi, 5 * pi / 3]:
    K_val = simplify(Abs(num374.subs(t, val)) / den374.subs(t, val) ** Rational(3, 2))
    assert simplify(K_val - 1 / (4 * a * sin(val / 2))) == 0

# 3-7-5: y = 2 * exp(x / 2), min radius of curvature
y375 = 2 * exp(x / 2)
dy375 = diff(y375, x)
d2y375 = diff(dy375, x)
rho375 = simplify((1 + dy375**2) ** Rational(3, 2) / d2y375)
drho375 = simplify(diff(rho375, x))
x_opt375 = solve(drho375, x)[0]
check(
    "jc935-3-7-5",
    (rho375, 2 * exp(-x / 2) * (1 + exp(x)) ** Rational(3, 2)),
    (drho375, exp(-x / 2) * sqrt(1 + exp(x)) * (2 * exp(x) - 1)),
    (x_opt375, -log(2)),
    (y375.subs(x, x_opt375), sqrt(2)),
    (rho375.subs(x, x_opt375), 3 * sqrt(3)),
)
assert float(drho375.subs(x, -2)) < 0 and float(drho375.subs(x, 0)) > 0

# 3-7-6: y = (1/k) * cosh(k*x) + c (k > 0), prove rho = k * (y - c)^2
y376 = cosh(k * x) / k + c
dy376 = diff(y376, x)
d2y376 = diff(dy376, x)
# 1 + sinh^2(kx) = cosh^2(kx) > 0, d2y376 = k*cosh(kx) > 0
rho376 = cosh(k * x) ** 3 / d2y376
check(
    "jc935-3-7-6",
    (dy376, sinh(k * x)),
    (d2y376, k * cosh(k * x)),
    (1 + dy376**2, cosh(k * x) ** 2),
    (rho376, k * (y376 - c) ** 2),
)

# 3-7-7: y = x^2 / 200, v = 20 m/s, m = 60 kg, g = 9.8 m/s^2
y377 = x**2 / 200
dy377 = diff(y377, x)
d2y377 = diff(dy377, x)
rho377 = ((1 + dy377**2) ** Rational(3, 2) / Abs(d2y377)).subs(x, 0)
F377 = 60 * Rational(98, 10) + 60 * 20**2 / rho377
check(
    "jc935-3-7-7",
    (rho377, 100),
    (60 * 20**2 / rho377, 240),
    (F377, 828),
)

# 3-7-8: parabolic arch bridge L = 24 m, h = 0.9 m, m = 4 t, v = 54 km/h, g = 9.8 m/s^2
a378 = Rational(9, 10) / 12**2
y378 = a378 * x**2
dy378 = diff(y378, x)
d2y378 = diff(dy378, x)
rho378 = ((1 + dy378**2) ** Rational(3, 2) / Abs(d2y378)).subs(x, 0)
v378 = Rational(54 * 1000, 3600)
F378 = 4000 * Rational(98, 10) - 4000 * v378**2 / rho378
check(
    "jc935-3-7-8",
    (a378, Rational(1, 160)),
    (rho378, 80),
    (v378, 15),
    (4000 * v378**2 / rho378, 11250),
    (F378, 27950),
)

# 3-7-9: y = (a/2) x^2 (a > 0), prove rho * d^2(rho)/ds^2 - (1/3) * (d(rho)/ds)^2 = 3
y379 = a * x**2 / 2
dy379 = diff(y379, x)
d2y379 = diff(dy379, x)
ds_dx379 = sqrt(1 + dy379**2)
rho379 = ds_dx379**3 / d2y379
drho_ds379 = simplify(diff(rho379, x) / ds_dx379)
d2rho_ds2_379 = simplify(diff(drho_ds379, x) / ds_dx379)
lhs379 = simplify(rho379 * d2rho_ds2_379 - Rational(1, 3) * drho_ds379**2)
check(
    "jc935-3-7-9",
    (drho_ds379, 3 * a * x),
    (d2rho_ds2_379, 3 * a / sqrt(1 + a**2 * x**2)),
    (lhs379, 3),
)

# 3-7-10: y = exp(x) at (0, 1), circle of curvature
y3710 = exp(x)
dy3710 = diff(y3710, x)
d2y3710 = diff(dy3710, x)
alpha3710 = (x - dy3710 * (1 + dy3710**2) / d2y3710).subs(x, 0)
beta3710 = (y3710 + (1 + dy3710**2) / d2y3710).subs(x, 0)
rho3710 = ((1 + dy3710**2) ** Rational(3, 2) / Abs(d2y3710)).subs(x, 0)
check(
    "jc935-3-7-10",
    (alpha3710, -2),
    (beta3710, 3),
    (rho3710, 2 * sqrt(2)),
    (rho3710**2, 8),
)

# 3-7-11: x^2 = 4*a*y (a > 0), evolute 27*a*alpha^2 = 4*(beta - 2*a)^3
y3711 = x**2 / (4 * a)
dy3711 = diff(y3711, x)
d2y3711 = diff(dy3711, x)
alpha3711 = simplify(x - dy3711 * (1 + dy3711**2) / d2y3711)
beta3711 = simplify(y3711 + (1 + dy3711**2) / d2y3711)
check(
    "jc935-3-7-11",
    (alpha3711, -(x**3) / (4 * a**2)),
    (beta3711, 2 * a + 3 * x**2 / (4 * a)),
    (27 * a * alpha3711**2 - 4 * (beta3711 - 2 * a) ** 3, 0),
)


# ===== 习题 3-8: 方程的近似解 (4 题) =====

# 3-8-1: x^3 + 2x^2 + 5x - 3 = 0 on (0, 1), bisection
f381 = x**3 + 2 * x**2 + 5 * x - 3
df381 = diff(f381, x)
check(
    "jc935-3-8-1",
    (f381.subs(x, 0), -3),
    (f381.subs(x, 1), 5),
    (df381, 3 * (x + Rational(2, 3)) ** 2 + Rational(11, 3)),
)
root381 = float(nsolve(f381, 0.5))
lo, hi = Rational(0), Rational(1)
for _ in range(7):
    mid = (lo + hi) / 2
    if f381.subs(x, mid) > 0:
        hi = mid
    else:
        lo = mid
assert lo == Rational(61, 128) and hi == Rational(62, 128)
assert float(hi - lo) < 0.01
assert float(lo) < root381 < float(hi)
assert abs(0.48 - root381) < 0.01

# 3-8-2: x^5 + 4x - 2 = 0 on (0, 1), Newton's method
f382 = x**5 + 4 * x - 2
df382 = diff(f382, x)
d2f382 = diff(df382, x)
check(
    "jc935-3-8-2",
    (f382.subs(x, 0), -2),
    (f382.subs(x, 1), 3),
    (df382, 5 * x**4 + 4),
    (d2f382, 20 * x**3),
)
assert f382.subs(x, 1) * d2f382.subs(x, 1) > 0
root382 = float(nsolve(f382, 0.5))
xn = Rational(1)
xn = xn - f382.subs(x, xn) / df382.subs(x, xn)
assert xn == Rational(2, 3)
x1_f = float(xn)
x2_f = x1_f - float(f382.subs(x, x1_f)) / float(df382.subs(x, x1_f))
x3_f = x2_f - float(f382.subs(x, x2_f)) / float(df382.subs(x, x2_f))
assert abs(x2_f - 0.5066) < 0.0005
assert abs(x3_f - 0.4928) < 0.0005
assert abs(float(f382.subs(x, x3_f))) / 4 < 0.01
assert abs(x3_f - root382) < 0.001
assert abs(0.49 - root382) < 0.01

# 3-8-3: x^3 + 4x - 2 = 0, secant method
f383 = x**3 + 4 * x - 2
df383 = diff(f383, x)
check(
    "jc935-3-8-3",
    (f383.subs(x, 0), -2),
    (f383.subs(x, 1), 3),
    (df383, 3 * x**2 + 4),
)
root383 = float(nsolve(f383, 0.5))
xp_s, xc_s = 1.0, 0.7
seq383 = [xp_s, xc_s]
for _ in range(3):
    fp = float(f383.subs(x, xp_s))
    fc = float(f383.subs(x, xc_s))
    xn_s = xc_s - (xc_s - xp_s) * fc / (fc - fp)
    seq383.append(xn_s)
    xp_s, xc_s = xc_s, xn_s
assert abs(seq383[2] - 0.5153) < 0.0005
assert abs(seq383[3] - 0.4766) < 0.0005
assert abs(seq383[4] - 0.4735) < 0.0005
assert abs(float(f383.subs(x, seq383[3]))) / 4 < 0.01
assert abs(float(f383.subs(x, seq383[4]))) / 4 < 0.0001
assert abs(seq383[4] - root383) < 0.0005
assert abs(0.47 - root383) < 0.01

# 3-8-4: x * ln(x) = 2 (x > 0), bisection on [2, 3]
f384 = x * log(x) - 2
df384 = diff(f384, x)
check(
    "jc935-3-8-4",
    (df384, log(x) + 1),
    (f384.subs(x, 1), -2),
)
assert float(f384.subs(x, 2)) < 0 < float(f384.subs(x, 3))
root384 = float(nsolve(f384, 2.3))
lo4, hi4 = Rational(2), Rational(3)
for _ in range(7):
    mid4 = (lo4 + hi4) / 2
    if float(f384.subs(x, float(mid4))) > 0:
        hi4 = mid4
    else:
        lo4 = mid4
assert lo4 == Rational(300, 128) and hi4 == Rational(301, 128)
assert float(hi4 - lo4) < 0.01
assert float(lo4) < root384 < float(hi4)
assert abs(2.35 - root384) < 0.01

assert len(verified) == 20, f"Expected 20 verified items, got {len(verified)}"
print(f"Verified {len(verified)} JC935 3-6..3-8 items symbolically and numerically.")
