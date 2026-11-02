import test from "node:test";
import assert from "node:assert/strict";
import { getAdminDestination } from "../src/lib/adminRouting.mjs";

for (const admin of [false, true]) {
  for (const pathname of ["/", "/products", "/cart", "/administrator"]) {
    test(`browser keeps ${pathname}, admin=${admin}`, () => {
      assert.equal(getAdminDestination({ pathname, standalone: false, admin }), null);
    });
  }
  for (const pathname of ["/admin", "/admin/login", "/admin/dashboard", "/admin/orders"]) {
    test(`browser blocks ${pathname}, admin=${admin}`, () => {
      assert.equal(getAdminDestination({ pathname, standalone: false, admin }), "/");
    });
  }
  for (const pathname of ["/", "/products", "/cart", "/admin"]) {
    test(`PWA redirects ${pathname}, admin=${admin}`, () => {
      assert.equal(getAdminDestination({ pathname, standalone: true, admin }), admin ? "/admin/dashboard" : "/admin/login");
    });
  }
}

test("PWA login stays available to signed-out users", () => {
  assert.equal(getAdminDestination({ pathname: "/admin/login", standalone: true }), null);
});
test("PWA login redirects authenticated admins to the dashboard", () => {
  assert.equal(getAdminDestination({ pathname: "/admin/login", standalone: true, admin: true }), "/admin/dashboard");
});
test("PWA protects control pages from unauthenticated users", () => {
  assert.equal(getAdminDestination({ pathname: "/admin/orders", standalone: true }), "/admin/login");
});
test("PWA allows authenticated admins to use control pages", () => {
  assert.equal(getAdminDestination({ pathname: "/admin/orders", standalone: true, admin: true }), null);
});
