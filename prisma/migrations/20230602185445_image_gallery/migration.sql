-- CreateTable
CREATE TABLE "car_images" (
    "id" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,

    CONSTRAINT "car_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "car_images" ADD CONSTRAINT "car_images_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
