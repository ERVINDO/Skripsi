<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CrowdfundingController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UploadController;
use App\Models\Crowdfunding;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController :: class , 'logout']);
    Route::apiResource('/users', UserController::class);
});

Route::post('/signup', [AuthController :: class , 'signup']);
Route::post('/login', [AuthController :: class , 'login']);
Route::post('/signupLembaga', [AuthController :: class , 'signupLembaga']);

Route::post('/profileTryEdit/{id}', [ProfileController::class, 'updateProfile']);

Route::post('/crowdfundings', [CrowdfundingController :: class, 'getCrowdfundings']);
Route::get('/crowdfunding/{id}', [CrowdfundingController :: class, 'getCrowdfunding']);
Route::post('/crowdfunding/request', [CrowdfundingController :: class, 'requestCrowdfunding']);
Route::post('/crowdfunding/approve/{id}', [CrowdfundingController :: class, 'approveCrowdfunding']);
Route::post('/crowdfunding/reject/{id}', [CrowdfundingController :: class, 'rejectCrowdfunding']);

Route::post('/uploads',[UploadController::class, 'createUpload']);
Route::get('/getLearningCategories',[UploadController::class, 'getLearningCategories']);
Route::post('/getLearnings',[UploadController::class, 'getLearnings']);
Route::post('/getLearning/{id}',[UploadController::class, 'getLearning']);
Route::post('/getLearningByCategory',[UploadController::class, 'getLearningByCategory']);
Route::post('/getLearningBySubCategory',[UploadController::class, 'getLearningBySubCategory']);
Route::post('/approveLearning',[UploadController::class, 'approveLearning']);
Route::post('/rejectLearning',[UploadController::class, 'rejectLearning']);


Route::post('/crowdfunding/transaction/create', [TransactionController:: class,'createNewTransaction']);
Route::post('/transactions', [TransactionController::class, 'getTransaction']);
Route::post('/transaction/approve', [TransactionController::class, 'approveTransaction']);
Route::post('/transaction/reject', [TransactionController::class, 'rejectTransaction']);

Route::post('/donations', [DonationController::class, 'getDonations']);
Route::post('/donation/{id}', [DonationController::class, 'getDonation']);
Route::post('/donation/update/{id}', [DonationController::class, 'updateDonationProgress']);
Route::post('/requestDonation', [DonationController::class, 'requestDonation']);
Route::post('/approveDonation',[DonationController::class, 'approveDonation']);
Route::post('/rejectDonation',[DonationController::class, 'rejectDonation']);
Route::post('/donationaslembaga',[DonationController::class, 'getDonationsAsLembaga']);
Route::post('/donationByCategoryAsLembaga',[DonationController::class, 'getDonationByCategoryAsLembaga']);
Route::post('/donationBySubCategoryAsLembaga',[DonationController::class, 'getDonationBySubCategoryAsLembaga']);


Route::get('/lembaga', [UserController::class, 'getLembaga']);
Route::get('/subcategories', [DonationController::class, 'getSubCategories']);
Route::get('/categories', [DonationController::class, 'getCategories']);
Route::post('/getDonationBySubCategory', [DonationController::class, 'getDonationBySubCategory']);
Route::post('/getDonationByCategory', [DonationController::class, 'getDonationByCategory']);
Route::get('/usersToApprove' ,[UserController::class, 'getUsersToApprove']);
Route::post('/mail',[UserController::class, 'sendEmail' ]);

Route::post('/users/approve/{id}', [UserController::class, 'approveUser']);
Route::post('/users/reject', [UserController::class, 'rejectUser']);
