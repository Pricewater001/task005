-- CreateTable
CREATE TABLE "Model" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Model_id_key" ON "Model"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Model_text_key" ON "Model"("text");
