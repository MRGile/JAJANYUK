import 'dotenv/config';
import { db, pool } from './index';
import {
  users,
  tenants,
  kasirInvitations,
  tenantKasirs,
  categories,
  products,
  orders,
  orderItems,
  payments,
} from './schema';
import { generateInvitationCode } from '@/lib/invitations/code-generator';
import { generateOrderNumber } from '@/lib/orders/order-number';

async function main() {
  console.log('🌱 Seeding database Jajan Yuk...');

  // ─── Users ────────────────────────────────────────────────────────────────

  const [admin] = await db.insert(users).values({
    name: 'Admin Jajan Yuk',
    email: 'admin@jajanyuk.id',
    role: 'admin',
    phone: '08100000001',
  }).$returningId();

  const [owner1] = await db.insert(users).values({
    name: 'Budi Santoso',
    email: 'budi@warungbudi.id',
    role: 'owner',
    phone: '08111111111',
  }).$returningId();

  const [owner2] = await db.insert(users).values({
    name: 'Siti Rahayu',
    email: 'siti@warungsiti.id',
    role: 'owner',
    phone: '08222222222',
  }).$returningId();

  const [kasir1] = await db.insert(users).values({
    name: 'Andi Kasir',
    email: 'andi@kasir.id',
    role: 'kasir',
    phone: '08333333333',
  }).$returningId();

  const [kasir2] = await db.insert(users).values({
    name: 'Rini Kasir',
    email: 'rini@kasir.id',
    role: 'kasir',
    phone: '08444444444',
  }).$returningId();

  const [pelanggan1] = await db.insert(users).values({
    name: 'Doni Pelanggan',
    email: 'doni@pelanggan.id',
    role: 'pelanggan',
    phone: '08555555555',
  }).$returningId();

  console.log('✅ Users seeded');

  // ─── Tenants ──────────────────────────────────────────────────────────────

  const [tenant1] = await db.insert(tenants).values({
    owner_id: owner1.id,
    name: 'Warung Budi',
    description: 'Warung makan enak dan murah milik Budi',
    address: 'Jl. Merdeka No. 10, Jakarta',
    phone: '02112345678',
    is_active: true,
  }).$returningId();

  const [tenant2] = await db.insert(tenants).values({
    owner_id: owner2.id,
    name: 'Kedai Siti',
    description: 'Kedai minuman segar milik Siti',
    address: 'Jl. Pahlawan No. 5, Bandung',
    phone: '02298765432',
    is_active: true,
  }).$returningId();

  console.log('✅ Tenants seeded');

  // ─── Tenant Kasirs ────────────────────────────────────────────────────────

  await db.insert(tenantKasirs).values([
    { tenant_id: tenant1.id, kasir_user_id: kasir1.id, is_active: true },
    { tenant_id: tenant2.id, kasir_user_id: kasir2.id, is_active: true },
  ]);

  console.log('✅ Tenant kasirs seeded');

  // ─── Kasir Invitations ────────────────────────────────────────────────────

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 hari dari sekarang

  await db.insert(kasirInvitations).values({
    tenant_id: tenant1.id,
    invited_by: owner1.id,
    invitation_code: generateInvitationCode(),
    kasir_user_id: kasir1.id,
    status: 'accepted',
    expires_at: expiresAt,
  });

  // Kode undangan yang masih pending (belum dipakai)
  const pendingExpiry = new Date();
  pendingExpiry.setDate(pendingExpiry.getDate() + 7);

  await db.insert(kasirInvitations).values({
    tenant_id: tenant1.id,
    invited_by: owner1.id,
    invitation_code: generateInvitationCode(),
    status: 'pending',
    expires_at: pendingExpiry,
  });

  console.log('✅ Kasir invitations seeded');

  // ─── Categories ───────────────────────────────────────────────────────────

  const [catMakanan] = await db.insert(categories).values({
    tenant_id: tenant1.id,
    name: 'Makanan',
    sort_order: 1,
  }).$returningId();

  const [catMinuman] = await db.insert(categories).values({
    tenant_id: tenant1.id,
    name: 'Minuman',
    sort_order: 2,
  }).$returningId();

  const [catSnack] = await db.insert(categories).values({
    tenant_id: tenant1.id,
    name: 'Snack',
    sort_order: 3,
  }).$returningId();

  const [catMinuman2] = await db.insert(categories).values({
    tenant_id: tenant2.id,
    name: 'Minuman Dingin',
    sort_order: 1,
  }).$returningId();

  console.log('✅ Categories seeded');

  // ─── Products ─────────────────────────────────────────────────────────────

  // Produk Warung Budi
  const [prodNasiGoreng] = await db.insert(products).values({
    tenant_id: tenant1.id,
    category_id: catMakanan.id,
    name: 'Nasi Goreng Spesial',
    description: 'Nasi goreng dengan telur, ayam, dan sayuran segar',
    price: '25000',
    cost_price: '15000',
    stock: 50,
    track_stock: true,
    is_active: true,
  }).$returningId();

  const [prodMieAyam] = await db.insert(products).values({
    tenant_id: tenant1.id,
    category_id: catMakanan.id,
    name: 'Mie Ayam Bakso',
    description: 'Mie ayam dengan bakso dan pangsit',
    price: '20000',
    cost_price: '12000',
    stock: 30,
    track_stock: true,
    is_active: true,
  }).$returningId();

  // Produk dengan stok 0 — test is_available = false
  const [prodSotoAyam] = await db.insert(products).values({
    tenant_id: tenant1.id,
    category_id: catMakanan.id,
    name: 'Soto Ayam',
    description: 'Soto ayam kuah bening dengan lontong',
    price: '18000',
    cost_price: '10000',
    stock: 0,
    track_stock: true,
    is_active: true,
  }).$returningId();

  const [prodEsTeh] = await db.insert(products).values({
    tenant_id: tenant1.id,
    category_id: catMinuman.id,
    name: 'Es Teh Manis',
    description: 'Teh manis segar dengan es batu',
    price: '5000',
    cost_price: '2000',
    stock: 100,
    track_stock: true,
    is_active: true,
  }).$returningId();

  // Produk tanpa track stok (selalu tersedia)
  const [prodAirPutih] = await db.insert(products).values({
    tenant_id: tenant1.id,
    category_id: catMinuman.id,
    name: 'Air Putih',
    description: 'Air mineral dingin',
    price: '3000',
    cost_price: '1000',
    stock: 0,
    track_stock: false, // is_available akan true meski stock=0
    is_active: true,
  }).$returningId();

  await db.insert(products).values({
    tenant_id: tenant1.id,
    category_id: catSnack.id,
    name: 'Kerupuk Udang',
    description: 'Kerupuk udang renyah',
    price: '3000',
    cost_price: '1500',
    stock: 200,
    track_stock: true,
    is_active: true,
  });

  // Produk Kedai Siti
  await db.insert(products).values([
    {
      tenant_id: tenant2.id,
      category_id: catMinuman2.id,
      name: 'Jus Alpukat',
      description: 'Jus alpukat segar dengan susu',
      price: '15000',
      cost_price: '8000',
      stock: 20,
      track_stock: true,
      is_active: true,
    },
    {
      tenant_id: tenant2.id,
      category_id: catMinuman2.id,
      name: 'Es Jeruk',
      description: 'Jeruk peras segar dengan es',
      price: '10000',
      cost_price: '5000',
      stock: 0,
      track_stock: true,
      is_active: true,
    },
  ]);

  console.log('✅ Products seeded');

  // ─── Orders ───────────────────────────────────────────────────────────────

  // Order demo: completed
  const orderNumber = generateOrderNumber();
  const [order1] = await db.insert(orders).values({
    tenant_id: tenant1.id,
    pelanggan_user_id: pelanggan1.id,
    kasir_user_id: kasir1.id,
    order_number: orderNumber,
    status: 'completed',
    notes: 'Tanpa saos',
    subtotal: '50000',
    total: '50000',
  }).$returningId();

  await db.insert(orderItems).values([
    {
      order_id: order1.id,
      product_id: prodNasiGoreng.id,
      product_name: 'Nasi Goreng Spesial',
      product_price: '25000',
      product_cost_price: '15000',
      quantity: 1,
      subtotal: '25000',
    },
    {
      order_id: order1.id,
      product_id: prodMieAyam.id,
      product_name: 'Mie Ayam Bakso',
      product_price: '20000',
      product_cost_price: '12000',
      quantity: 1,
      subtotal: '20000',
    },
    {
      order_id: order1.id,
      product_id: prodEsTeh.id,
      product_name: 'Es Teh Manis',
      product_price: '5000',
      product_cost_price: '2000',
      quantity: 1,
      subtotal: '5000',
    },
  ]);

  await db.insert(payments).values({
    order_id: order1.id,
    method: 'cash',
    status: 'paid',
    amount_due: '50000',
    amount_paid: '60000',
    change_amount: '10000',
    paid_at: new Date(),
  });

  // Order demo: pending
  const [order2] = await db.insert(orders).values({
    tenant_id: tenant1.id,
    pelanggan_user_id: pelanggan1.id,
    order_number: generateOrderNumber(),
    status: 'pending',
    subtotal: '25000',
    total: '25000',
  }).$returningId();

  await db.insert(orderItems).values({
    order_id: order2.id,
    product_id: prodNasiGoreng.id,
    product_name: 'Nasi Goreng Spesial',
    product_price: '25000',
    product_cost_price: '15000',
    quantity: 1,
    subtotal: '25000',
  });

  await db.insert(payments).values({
    order_id: order2.id,
    method: 'cash',
    status: 'pending',
    amount_due: '25000',
  });

  console.log('✅ Orders seeded');

  console.log('');
  console.log('🎉 Seed selesai!');
  console.log('');
  console.log('Data yang dibuat:');
  console.log('  👤 Users: admin, 2 owner, 2 kasir, 1 pelanggan');
  console.log('  🏪 Tenants: Warung Budi, Kedai Siti');
  console.log('  📦 Products: 8 produk (ada yang stok 0, ada yang track_stock=false)');
  console.log('  🛒 Orders: 1 completed + 1 pending');
  console.log('  🔑 Invitation codes: 1 accepted + 1 pending');

  await pool.end();
}

main().catch((err) => {
  console.error('❌ Seed gagal:', err);
  process.exit(1);
});
