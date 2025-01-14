<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('crowdfundings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->string('title');
            $table->longText('description');
            $table->string('image');
            $table->string('location');
            $table->bigInteger('fund')->nullable()->default(0);
            $table->bigInteger('target');
            $table->integer('status')->default(0);
            $table->integer('deadline');
            $table->string('no_rekening');
            $table->string('nama_rekening');
            $table->string('bank');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('crowdfundings');
    }
};
