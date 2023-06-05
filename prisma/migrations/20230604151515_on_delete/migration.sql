-- DropForeignKey
ALTER TABLE "car_images" DROP CONSTRAINT "car_images_car_id_fkey";

-- AddForeignKey
ALTER TABLE "car_images" ADD CONSTRAINT "car_images_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Cars"("id") ON DELETE CASCADE ON UPDATE CASCADE;
