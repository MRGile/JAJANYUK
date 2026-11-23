import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  boolean,
  timestamp,
  decimal,
  pgEnum,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

// ─── users ───────────────────────────────────────────────────────────────────

const userRole = pgEnum('user_role', ['pelanggan', 'owner', 'kasir', 'admin']);
const invitationStatus = pgEnum('invitation_status', ['pending', 'accepted', 'revoked']);
const orderStatus = pgEnum('order_status', ['pending', 'confirmed', 'processing', 'ready', 'completed', 'cancelled']);
const paymentMethod = pgEnum('payment_method', ['cash', 'qris']);
const paymentStatus = pgEnum('payment_status', ['pending', 'paid', 'refunded', 'failed']);
const stockMovementType = pgEnum('stock_movement_type', ['sale', 'restock', 'adjustment', 'refund']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  password_hash: varchar('password_hash', { length: 255 }),
  role: userRole('role').notNull(),
  phone: varchar('phone', { length: 20 }),
  avatar_url: text('avatar_url'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
}, (t) => ({
  emailIdx: uniqueIndex('users_email_idx').on(t.email),
}));

// ─── tenants ─────────────────────────────────────────────────────────────────

export const tenants = pgTable('tenants', {
  id: serial('id').primaryKey(),
  owner_id: integer('owner_id').references(() => users.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  logo_url: text('logo_url'),
  banner_url: text('banner_url'),
  address: text('address'),
  phone: varchar('phone', { length: 20 }),
  is_active: boolean('is_active').default(true),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
});

// ─── kasir_invitations ───────────────────────────────────────────────────────

export const kasirInvitations = pgTable('kasir_invitations', {
  id: serial('id').primaryKey(),
  tenant_id: integer('tenant_id').references(() => tenants.id),
  invited_by: integer('invited_by').references(() => users.id),
  invitation_code: varchar('invitation_code', { length: 32 }).notNull(),
  kasir_user_id: integer('kasir_user_id').references(() => users.id),
  status: invitationStatus('status').default('pending'),
  expires_at: timestamp('expires_at').notNull(),
  created_at: timestamp('created_at').defaultNow(),
}, (t) => ({
  codeIdx: uniqueIndex('kasir_invitations_code_idx').on(t.invitation_code),
}));

// ─── tenant_kasirs ───────────────────────────────────────────────────────────

export const tenantKasirs = pgTable('tenant_kasirs', {
  id: serial('id').primaryKey(),
  tenant_id: integer('tenant_id').references(() => tenants.id),
  kasir_user_id: integer('kasir_user_id').references(() => users.id),
  is_active: boolean('is_active').default(true),
  joined_at: timestamp('joined_at').defaultNow(),
});

// ─── categories ──────────────────────────────────────────────────────────────

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  tenant_id: integer('tenant_id').references(() => tenants.id),
  name: varchar('name', { length: 100 }).notNull(),
  sort_order: integer('sort_order').default(0),
  created_at: timestamp('created_at').defaultNow(),
});

// ─── products ────────────────────────────────────────────────────────────────

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  tenant_id: integer('tenant_id').references(() => tenants.id),
  category_id: integer('category_id').references(() => categories.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 12, scale: 2 }).notNull(),
  cost_price: decimal('cost_price', { precision: 12, scale: 2 }),
  image_url: text('image_url'),
  stock: integer('stock').notNull().default(0),
  track_stock: boolean('track_stock').default(true),
  is_active: boolean('is_active').default(true),
  /**
   * Generated column: produk tersedia jika track_stock=false ATAU stock>0.
   * PostgreSQL generated column — dihitung otomatis oleh DB.
   */
  is_available: boolean('is_available').generatedAlwaysAs(
    sql`(track_stock = FALSE OR stock > 0)`
  ),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
});

// ─── orders ──────────────────────────────────────────────────────────────────

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  tenant_id: integer('tenant_id').references(() => tenants.id),
  pelanggan_user_id: integer('pelanggan_user_id').references(() => users.id),
  kasir_user_id: integer('kasir_user_id').references(() => users.id),
  order_number: varchar('order_number', { length: 50 }).notNull(),
  status: orderStatus('status').default('pending'),
  notes: text('notes'),
  subtotal: decimal('subtotal', { precision: 12, scale: 2 }).notNull(),
  total: decimal('total', { precision: 12, scale: 2 }).notNull(),
  cancelled_at: timestamp('cancelled_at'),
  cancel_reason: text('cancel_reason'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
}, (t) => ({
  orderNumberIdx: uniqueIndex('orders_order_number_idx').on(t.order_number),
}));

// ─── order_items ─────────────────────────────────────────────────────────────

export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  order_id: integer('order_id').references(() => orders.id),
  product_id: integer('product_id').references(() => products.id),
  /** Snapshot nama produk saat order dibuat */
  product_name: varchar('product_name', { length: 255 }).notNull(),
  /** Snapshot harga jual saat order dibuat */
  product_price: decimal('product_price', { precision: 12, scale: 2 }).notNull(),
  /** Snapshot HPP saat order dibuat */
  product_cost_price: decimal('product_cost_price', { precision: 12, scale: 2 }),
  quantity: integer('quantity').notNull(),
  /** price * quantity, dihitung server saat insert */
  subtotal: decimal('subtotal', { precision: 12, scale: 2 }).notNull(),
});

// ─── payments ────────────────────────────────────────────────────────────────

export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  order_id: integer('order_id').references(() => orders.id),
  method: paymentMethod('method').notNull().default('cash'),
  status: paymentStatus('status').default('pending'),
  amount_due: decimal('amount_due', { precision: 12, scale: 2 }).notNull(),
  amount_paid: decimal('amount_paid', { precision: 12, scale: 2 }),
  change_amount: decimal('change_amount', { precision: 12, scale: 2 }),
  qris_reference: varchar('qris_reference', { length: 255 }),
  paid_at: timestamp('paid_at'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
}, (t) => ({
  orderIdx: uniqueIndex('payments_order_id_idx').on(t.order_id),
}));

// ─── refunds ─────────────────────────────────────────────────────────────────

export const refunds = pgTable('refunds', {
  id: serial('id').primaryKey(),
  order_id: integer('order_id').references(() => orders.id),
  payment_id: integer('payment_id').references(() => payments.id),
  amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
  reason: text('reason'),
  processed_by: integer('processed_by').references(() => users.id),
  created_at: timestamp('created_at').defaultNow(),
});

// ─── stock_movements ─────────────────────────────────────────────────────────

export const stockMovements = pgTable('stock_movements', {
  id: serial('id').primaryKey(),
  product_id: integer('product_id').references(() => products.id),
  order_id: integer('order_id').references(() => orders.id),
  type: stockMovementType('type').notNull(),
  /** Negatif untuk pengurangan stok */
  quantity_change: integer('quantity_change').notNull(),
  stock_before: integer('stock_before').notNull(),
  stock_after: integer('stock_after').notNull(),
  notes: text('notes'),
  created_at: timestamp('created_at').defaultNow(),
});

// ─── Relations ───────────────────────────────────────────────────────────────

export const usersRelations = relations(users, ({ many }) => ({
  tenants: many(tenants),
  kasirInvitationsCreated: many(kasirInvitations, { relationName: 'invitedBy' }),
  kasirInvitationsAccepted: many(kasirInvitations, { relationName: 'kasirUser' }),
  tenantKasirs: many(tenantKasirs),
  ordersAsPelanggan: many(orders, { relationName: 'pelangganOrders' }),
  ordersAsKasir: many(orders, { relationName: 'kasirOrders' }),
  refundsProcessed: many(refunds),
}));

export const tenantsRelations = relations(tenants, ({ one, many }) => ({
  owner: one(users, { fields: [tenants.owner_id], references: [users.id] }),
  categories: many(categories),
  products: many(products),
  kasirInvitations: many(kasirInvitations),
  tenantKasirs: many(tenantKasirs),
  orders: many(orders),
}));

export const kasirInvitationsRelations = relations(kasirInvitations, ({ one }) => ({
  tenant: one(tenants, { fields: [kasirInvitations.tenant_id], references: [tenants.id] }),
  invitedBy: one(users, {
    fields: [kasirInvitations.invited_by],
    references: [users.id],
    relationName: 'invitedBy',
  }),
  kasirUser: one(users, {
    fields: [kasirInvitations.kasir_user_id],
    references: [users.id],
    relationName: 'kasirUser',
  }),
}));

export const tenantKasirsRelations = relations(tenantKasirs, ({ one }) => ({
  tenant: one(tenants, { fields: [tenantKasirs.tenant_id], references: [tenants.id] }),
  kasirUser: one(users, { fields: [tenantKasirs.kasir_user_id], references: [users.id] }),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  tenant: one(tenants, { fields: [categories.tenant_id], references: [tenants.id] }),
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  tenant: one(tenants, { fields: [products.tenant_id], references: [tenants.id] }),
  category: one(categories, { fields: [products.category_id], references: [categories.id] }),
  orderItems: many(orderItems),
  stockMovements: many(stockMovements),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  tenant: one(tenants, { fields: [orders.tenant_id], references: [tenants.id] }),
  pelanggan: one(users, {
    fields: [orders.pelanggan_user_id],
    references: [users.id],
    relationName: 'pelangganOrders',
  }),
  kasir: one(users, {
    fields: [orders.kasir_user_id],
    references: [users.id],
    relationName: 'kasirOrders',
  }),
  items: many(orderItems),
  payment: one(payments),
  refunds: many(refunds),
  stockMovements: many(stockMovements),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.order_id], references: [orders.id] }),
  product: one(products, { fields: [orderItems.product_id], references: [products.id] }),
}));

export const paymentsRelations = relations(payments, ({ one, many }) => ({
  order: one(orders, { fields: [payments.order_id], references: [orders.id] }),
  refunds: many(refunds),
}));

export const refundsRelations = relations(refunds, ({ one }) => ({
  order: one(orders, { fields: [refunds.order_id], references: [orders.id] }),
  payment: one(payments, { fields: [refunds.payment_id], references: [payments.id] }),
  processedBy: one(users, { fields: [refunds.processed_by], references: [users.id] }),
}));

export const stockMovementsRelations = relations(stockMovements, ({ one }) => ({
  product: one(products, { fields: [stockMovements.product_id], references: [products.id] }),
  order: one(orders, { fields: [stockMovements.order_id], references: [orders.id] }),
}));
